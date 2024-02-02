import { Cashier } from "@prisma/client";
import { MailerService } from "@nestjs-modules/mailer";
import { Injectable } from "@nestjs/common";
import path from "path";

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendCashierPassword(cashier: Cashier, password: string) {
    await this.mailerService.sendMail({
      to: cashier.email,
      subject: "Welcome to Nice App! Confirm your Email",
      template: path.join(__dirname, "mail/templates/confirmation"),
      context: {
        name: `${cashier.first_name} ${cashier.last_name}`,
        iin: cashier.iin,
        password: password,
      },
    });
  }
}
