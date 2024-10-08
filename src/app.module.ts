import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma.service";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { MailModule } from "./mail/mail.module";
import { CashierModule } from "./cashier/cashier.module";
import { MeasureModule } from './measure/measure.module';
import { AddressModule } from './address/address.module';
import { CashboxModule } from './cashbox/cashbox.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    MailModule,
    CashierModule,
    MeasureModule,
    AddressModule,
    CashboxModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
