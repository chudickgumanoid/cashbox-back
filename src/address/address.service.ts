import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { CreateAddressDto } from "./dto/create-address.dto";
import { returnAddressObject } from "./return-address.object";

@Injectable()
export class AddressService {
  constructor(private prisma: PrismaService) {}
  // TODO: мб прикрутить адресный регистр
  // https://dev.address-registry.itanalytics.kz/
  async get(id: number) {
    console.log(id, "id");
    return this.prisma.address.findMany({
      where: { cashierId: id },
      select: {
        ...returnAddressObject,
      },
    });
  }

  async create(id: number, dto: CreateAddressDto) {
    return await this.prisma.address.create({
      data: {
        title: dto.title,
        address: dto.address,
        cashierId: id,
      },
      select: {
        ...returnAddressObject,
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
      select: {
        ...returnAddressObject,
      },
    });
  }

  private async isExistsAddress(id: number) {
    const address = await this.prisma.address.findUnique({ where: { id } });

    if (!address) {
      throw new NotFoundException("Address not found");
    }
    return address;
  }
}
