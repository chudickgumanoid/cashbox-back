import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Cashier } from "@prisma/client";
import { Auth } from "src/decorators/auth.decorator";
import { CurrentCashier } from "src/decorators/current-cashier.decorator";
import { CashboxDto } from "./cashbox.dto";
import { CashboxService } from "./cashbox.service";

@Controller("")
export class CashboxController {
  constructor(private readonly cashboxService: CashboxService) {}

  @Auth()
  @HttpCode(200)
  @Post("/create-cashbox")
  @UsePipes(new ValidationPipe())
  async create(@CurrentCashier() cashier: Cashier, @Body() dto: CashboxDto) {
    return this.cashboxService.create(cashier, dto);
  }
}
