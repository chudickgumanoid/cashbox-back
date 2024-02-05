import { Module } from "@nestjs/common";
import { CashierService } from "./cashier.service";
import { CashierController } from "./cashier.controller";
import { PrismaService } from "src/prisma.service";
import { CashierCommonService } from "./cashier-common.service";

@Module({
  controllers: [CashierController],
  providers: [CashierService, CashierCommonService, PrismaService],
})
export class CashierModule {}
