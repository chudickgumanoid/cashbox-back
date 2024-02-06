import { Injectable, BadRequestException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class CashierCommonService {
  constructor(private prisma: PrismaService) {}

  async isExistsCashier(
    email: string,
    login: string,
    iin: string,
    currentCashierId?: number
  ) {
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

    if (
      isExistEmail &&
      (!currentCashierId || currentCashierId !== isExistEmail.id)
    )
      throw new BadRequestException("Email already exists");

    if (
      isExistLogin &&
      (!currentCashierId || currentCashierId !== isExistLogin.id)
    )
      throw new BadRequestException("Login already exists");

    if (isExistIin && (!currentCashierId || currentCashierId !== isExistIin.id))
      throw new BadRequestException("Iin already exists");
  }
}
