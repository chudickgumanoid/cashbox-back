import { Body, Controller, Get, Patch } from "@nestjs/common";
import { CashierService } from "./cashier.service";
import { CurrentCashier } from "src/decorators/current-cashier.decorator";
import { Auth } from "src/decorators/auth.decorator";
import { UpdateProfileDto } from "./dto/update-cashier.dto";

@Controller("")
export class CashierController {
  constructor(private readonly cashierService: CashierService) {}

  @Get("profile")
  @Auth()
  async profile(@CurrentCashier("id") id: number) {
    return await this.cashierService.profile(id);
  }

  @Patch("profile")
  @Auth()
  async updateProfile(
    @CurrentCashier("id") id: number,
    @Body() dto: UpdateProfileDto,
  ) {
    return await this.cashierService.update(id, dto);
  }
}
