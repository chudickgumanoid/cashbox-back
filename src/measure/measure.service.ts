import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { MeasureDto } from "./dto/create-measure.dto";
import { Measure } from "@prisma/client";
import { returnMeasureObject } from "./return-measure-object";

@Injectable()
export class MeasureService {
  constructor(private prisma: PrismaService) {}

  async get(): Promise<Measure[]> {
    return await this.prisma.measure.findMany({
      select: {
        ...returnMeasureObject,
      },
    });
  }

  async create(dto: MeasureDto): Promise<Measure> {
    await this.isExistsCode(dto.code);

    const measure = await this.prisma.measure.create({
      data: {
        name: dto.name,
        fullName: dto.full_name,
        code: dto.code,
      },
      select: {
        ...returnMeasureObject,
      },
    });

    return measure;
  }

  async update(id: number, dto: MeasureDto): Promise<Measure> {
    const existingMeasure = await this.checkIdMeasure(id);

    if (dto.code !== existingMeasure.code) {
      await this.isExistsCode(dto.code);
    }
    return this.prisma.measure.update({
      where: { id },
      data: {
        name: dto.name,
        fullName: dto.full_name,
        code: dto.code,
      },
      select: {
        ...returnMeasureObject,
      },
    });
  }

  async delete(id: number) {
    await this.checkIdMeasure(id);

    const isDeleted = await this.prisma.measure.delete({ where: { id } });

    if (isDeleted) {
      throw new HttpException(
        `Success deleted measure id: ${id}`,
        HttpStatus.OK
      );
    }
    if (!isDeleted) {
      throw new BadRequestException(`Failed to delete measure: ${id}`);
    }
  }

  private async checkIdMeasure(id: number) {
    const isExists = await this.prisma.measure.findUnique({
      where: { id },
    });
    if (!isExists) throw new BadRequestException("Measure not found");
    return isExists;
  }

  private async isExistsCode(code: string): Promise<void> {
    const isExistsCode = await this.findUniqCode(code);
    if (isExistsCode) throw new BadRequestException("Code already exists");
  }

  private async findUniqCode(code: string): Promise<Measure | null> {
    console.log(code, "code");
    return await this.prisma.measure.findUnique({ where: { code } });
  }
}
