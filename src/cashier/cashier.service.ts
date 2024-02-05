import { Injectable } from "@nestjs/common";
import { returnCashierFields } from "src/auth/return-cashier-object";
import { PrismaService } from "src/prisma.service";
import { UpdateProfileDto } from "./dto/update-cashier.dto";
import { CashierCommonService } from "./cashier-common.service";

@Injectable()
export class CashierService {
  constructor(
    private prisma: PrismaService,
    private common: CashierCommonService,
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

  async getCashierByID(id: number) {
    return await this.prisma.cashier.findUnique({
      where: { id: id },
    });
  }
}
