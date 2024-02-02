import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as argon2 from "argon2";
import { Cashier } from "@prisma/client";
import { PrismaService } from "./../prisma.service";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { AuthLoginDto } from "./dto/auth-login.dto";
import { returnCashierFields } from "./return-cashier-object";
import { MailService } from "src/mail/mail.service";
import { randomPassword } from "src/helper/randomPassword";

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private mail: MailService
  ) {}

  async login(dto: AuthLoginDto) {
    const cashier = await this.validateCashier(dto);
    const token = await this.issueTokens(cashier.id);
    // await this.mail.sendCashierPassword(cashier);

    return {
      cashier: returnCashierFields(cashier),
      ...token,
    };
  }

  async register(dto: AuthRegisterDto) {
    await this.isExistsCashier(dto.email, dto.login, dto.iin);

    const password: string = randomPassword(16);
    const cashier = await this.createCashier(dto, password);

    await this.mail.sendCashierPassword(cashier, password);

    const token = await this.issueTokens(cashier.id);

    return {
      cashier: returnCashierFields(cashier),
      ...token,
    };
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
        password: await argon2.hash(password),
      },
    });
  }

  private async isExistsCashier(email: string, login: string, iin: string) {
    const isExistLogin = await this.prisma.cashier.findUnique({
      where: {
        login,
      },
    });

    const isExistEmail = await this.prisma.cashier.findUnique({
      where: {
        email,
      },
    });

    const isExistIin = await this.prisma.cashier.findUnique({
      where: {
        iin,
      },
    });

    if (isExistEmail) throw new BadRequestException("Email already exists");
    if (isExistLogin) throw new BadRequestException("Login already exists");
    if (isExistIin) throw new BadRequestException("Iin already exists");
  }

  private async issueTokens(CashierId: number) {
    const data = { id: CashierId };
    const accessToken = this.jwt.sign(data, { expiresIn: "10m" });

    return { accessToken };
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

    const isValid = await argon2.verify(cashier.password, dto.password);

    if (!isValid) throw new BadRequestException("Invalid password");

    return cashier;
  }
}
