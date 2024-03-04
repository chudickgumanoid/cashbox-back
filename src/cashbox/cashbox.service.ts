import { BadRequestException, Injectable } from "@nestjs/common";
import { Cashier } from "@prisma/client";
import { generateSerialNumber } from "src/helper/generateSerialNumber";
import { PrismaService } from "src/prisma.service";
import { CashboxDto } from "./cashbox.dto";

@Injectable()
export class CashboxService {
  constructor(private prisma: PrismaService) {}

  async create(cashier: Cashier, dto: CashboxDto) {
    const configId = await this.createConfig();

    const serial = "111111111111";

    await this.checkSerialNumber(serial);

    const cashbox = await this.prisma.cashbox.create({
      data: {
        title: dto.title,
        iin: cashier.iin,
        serialNumber: serial,
        config: {
          connect: {
            id: configId,
            // id: 1,
          },
        },
        address: {
          connect: {
            id: dto.addressId,
          },
        },
        cashier: {
          connect: {
            id: cashier.id,
          },
        },
      },
    });

    return cashbox;
  }

  private async createConfig(): Promise<number> {
    const config = await this.prisma.cashboxConfig.create({
      data: {
        isOpen: false,
        autoCloseTime: "20:00",
        cashSum: 0,
        maxSum: 3_000_000,
        numberShift: 0,
        ticketNumber: 0,
        closeTime: new Date(),
        openTime: new Date(),
        defaultMeasureUnit: {
          connect: {
            code: "796",
          },
        },
      },
    });

    return config.id;
  }

  private async checkSerialNumber(serial: string) {
    const isExists = this.prisma.cashbox.findUnique({
      where: { serialNumber: serial },
    });

    if (!isExists) {
      throw new BadRequestException("Serial number already exist");
    }
  }
}
