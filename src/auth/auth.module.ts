import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PrismaService } from "src/prisma.service";
import { getJwtConfig } from "src/config/jwt.config";
import { JwtStrategy } from "./jwt.strategy";
import { MailModule } from "src/mail/mail.module";
import { CashierCommonService } from "src/cashier/cashier-common.service";
import { CashierService } from "src/cashier/cashier.service";

@Module({
  imports: [
    ConfigModule,
    MailModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: getJwtConfig,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    JwtStrategy,
    CashierService,
    CashierCommonService,
  ],
})
export class AuthModule {}
