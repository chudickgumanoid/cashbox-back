import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Cashier } from "@prisma/client";
import { PrismaService } from "./../prisma.service";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { returnCashierShortFields } from "./return-cashier-object";
import { MailService } from "src/mail/mail.service";
import { randomPassword } from "src/helper/randomPassword";
import { CashierCommonService } from "src/cashier/cashier-common.service";
import { CashierService } from "src/cashier/cashier.service";
import { hash, verify } from "argon2";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private mail: MailService,
    private cashier: CashierService,
    private cashierCommon: CashierCommonService,
  ) {}

  async login(dto: AuthLoginDto) {
    const cashier = await this.validateCashier(dto);
    const tokens = await this.issueTokens(cashier.id);

    return {
      cashier: returnCashierShortFields(cashier),
      ...tokens,
    };
  }

  async register(dto: AuthRegisterDto) {
    await this.cashierCommon.isExistsCashier(dto.email, dto.login, dto.iin);

    const password: string = randomPassword(16);
    const cashier = await this.createCashier(dto, password);

    // TODO: transaction if error message
    await this.mail.sendCashierPassword(cashier, password);

    const tokens = await this.issueTokens(cashier.id);

    return {
      cashier: returnCashierShortFields(cashier),
      ...tokens,
    };
  }

  async getNewToken(refreshToken: string) {
    try {
      const res = await this.jwt.verifyAsync(refreshToken);
      if (!res) {
        throw new UnauthorizedException("Invalid refresh tokens");
      }

      const cashier = await this.cashier.getCashierByID(res.id);
      const tokens = await this.issueTokens(cashier.id);

      return {
        cashier: returnCashierShortFields(cashier),
        ...tokens,
      };
    } catch (error) {
      throw new BadRequestException("Invalid signature");
    }
  }

  private async createCashier(dto: AuthRegisterDto, password: string) {
    return await this.prisma.cashier.create({
      data: {
        first_name: dto.first_name,
        last_name: dto.last_name,
        patronymic: dto.patronymic || "",
        login: dto.login,
        iin: dto.iin,
        email: dto.email,
        status: "INACTIVE",
        password: await hash(password),
      },
    });
  }

  private async issueTokens(CashierId: number) {
    const data = { id: CashierId };
    const accessToken = this.jwt.sign(data, { expiresIn: "10m" });
    const refreshToken = this.jwt.sign(data, { expiresIn: "1d" });

    return { accessToken, refreshToken };
  }

  private async validateCashier(dto: AuthLoginDto) {
    let cashier: Cashier | null = null;

    if (dto.login) {
      cashier = await this.prisma.cashier.findFirst({
        where: {
          OR: [{ login: dto.login }, { email: dto.login }, { iin: dto.login }],
        },
      });
    }

    if (!cashier) throw new NotFoundException("Cashier not found");

    const isValid = await verify(cashier.password, dto.password);

    if (!isValid) throw new BadRequestException("Invalid password");

    return cashier;
  }
}
