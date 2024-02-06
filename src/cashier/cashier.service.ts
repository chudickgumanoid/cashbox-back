import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { returnCashierFields } from "src/auth/return-cashier-object";
import { PrismaService } from "src/prisma.service";
import { UpdateProfileDto } from "./dto/update-cashier.dto";
import { CashierCommonService } from "./cashier-common.service";
import { UpdatePasswordDto } from "./dto/update-password.dto";
import { hash, verify } from "argon2";

@Injectable()
export class CashierService {
  constructor(
    private prisma: PrismaService,
    private common: CashierCommonService
  ) {}

  async profile(id: number) {
    const cashier = await this.getCashierByID(id);

    return { ...returnCashierFields(cashier) };
  }

  async update(id: number, dto: UpdateProfileDto) {
    await this.common.isExistsCashier(dto.email, dto.login, dto.iin, id);

    return await this.prisma.cashier.update({
      where: { id },
      data: {
        login: dto.login,
        email: dto.email,
        iin: dto.iin,
        first_name: dto.first_name,
        last_name: dto.last_name,
        patronymic: dto.patronymic,
      },
    });
  }

  async updatePassword(id: number, dto: UpdatePasswordDto) {
    const cashier = await this.getCashierByID(id);

    const isValid = await verify(cashier.password, dto.previosPassword);
    const isSamePassword = await verify(cashier.password, dto.newPassword);

    if (!isValid) throw new BadRequestException("Invalid old password");
    if (isSamePassword)
      throw new BadRequestException("New password is the same as the old one");

    if (dto.newPassword !== dto.newPasswordConfirm)
      throw new BadRequestException("Invalid confirm password");

    const update = await this.prisma.cashier.update({
      where: { id },
      data: {
        password: await hash(dto.newPassword),
      },
    });

    if (update) {
      throw new HttpException("Succes change password", HttpStatus.OK);
    }
  }

  async getCashierByID(id: number) {
    return await this.prisma.cashier.findUnique({
      where: { id: id },
    });
  }
}
