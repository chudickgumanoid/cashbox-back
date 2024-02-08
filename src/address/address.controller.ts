import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Auth } from "src/decorators/auth.decorator";
import { CurrentCashier } from "src/decorators/current-cashier.decorator";
import { AddressService } from "./address.service";
import { CreateAddressDto } from "./dto/create-address.dto";

@Controller("address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Get()
  @Auth()
  async get(@CurrentCashier("id") id: number) {
    return await this.addressService.get(+id);
  }

  @Post()
  @HttpCode(200)
  @Auth()
  @UsePipes(new ValidationPipe())
  async create(
    @CurrentCashier("id") id: number,
    @Body() dto: CreateAddressDto
  ) {
    return this.addressService.create(id, dto);
  }

  @Patch(":id")
  @Auth()
  @UsePipes(new ValidationPipe())
  async update(@Param("id") id: number, @Body() dto: CreateAddressDto) {
    return await this.addressService.update(+id, dto);
  }
}
