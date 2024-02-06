import {
  Body,
  Controller,
  Get,
  Patch,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { CashierService } from "./cashier.service";
import { CurrentCashier } from "src/decorators/current-cashier.decorator";
import { Auth } from "src/decorators/auth.decorator";
import { UpdateProfileDto } from "./dto/update-cashier.dto";
import { UpdatePasswordDto } from "./dto/update-password.dto";

@Controller("")
export class CashierController {
  constructor(private readonly cashierService: CashierService) {}

  @Auth()
  @Get("profile")
  async profile(@CurrentCashier("id") id: number) {
    return await this.cashierService.profile(id);
  }

  @Auth()
  @Patch("profile")
  @UsePipes(new ValidationPipe())
  async updateProfile(
    @CurrentCashier("id") id: number,
    @Body() dto: UpdateProfileDto
  ) {
    return await this.cashierService.update(id, dto);
  }

  @Auth()
  @Patch("update-password")
  @UsePipes(new ValidationPipe())
  async updatePassword(
    @CurrentCashier("id") id: number,
    @Body() dto: UpdatePasswordDto
  ) {
    return await this.cashierService.updatePassword(id, dto);
  }
}
