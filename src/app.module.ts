import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { PrismaService } from "./prisma.service";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { MailModule } from "./mail/mail.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), AuthModule, MailModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
