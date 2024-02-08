import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AddressService } from "./address.service";
import { Auth } from "src/decorators/auth.decorator";
import { CurrentCashier } from "src/decorators/current-cashier.decorator";
import { CreateAddressDto } from "./dto/create-address.dto";

@Controller("address")
export class AddressController {
  constructor(private readonly addressService: AddressService) {}

  @Auth()
  @Get()
  async get(@CurrentCashier("id") id: number) {
    return await this.addressService.get(+id);
  }

  @Post()
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
  async update(
    @Param("id") id: number,
    @Body() dto: CreateAddressDto
  ) {
    return await this.addressService.update(+id, dto);
  }
}
