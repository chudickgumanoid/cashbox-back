import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { MeasureService } from "./measure.service";
import { MeasureDto } from "./dto/create-measure.dto";

@Controller("measure")
export class MeasureController {
  constructor(private readonly measureService: MeasureService) {}

  @Get("")
  async get() {
    return this.measureService.get();
  }

  @Post("")
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: MeasureDto) {
    return this.measureService.create(dto);
  }

  @Patch(":id")
  @UsePipes(new ValidationPipe())
  async update(@Param("id") id: number, @Body() dto: MeasureDto) {
    return this.measureService.update(+id, dto);
  }

  @Delete(":id")
  async delete(@Param("id") id: number) {
    return this.measureService.delete(+id);
  }
}
