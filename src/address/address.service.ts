import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateAddressDto } from "./dto/create-address.dto";

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}
  // TODO: мб прикрутить адресный регистр
  // https://dev.address-registry.itanalytics.kz/
  async get(id: number) {
    return this.prisma.address.findMany({ where: { id } });
  }

  async create(id: number, dto: CreateAddressDto) {
    return await this.prisma.address.create({
      data: {
        title: dto.title,
        address: dto.address,
        cashierId: id,
      },
    });
  }

  async update(id: number, dto: CreateAddressDto) {
    await this.isExistsAddress(id);

    return await this.prisma.address.update({
      where: { id },
      data: {
        title: dto.title,
        address: dto.address,
      },
    });
  }

  private async isExistsAddress(id: number) {
    const address = await this.prisma.address.findUnique({ where: { id } });

    if (!address) {
      throw new BadRequestException("Address not found");
    }
    return address;
  }
}
