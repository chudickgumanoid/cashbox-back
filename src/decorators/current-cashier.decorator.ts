import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Cashier } from "@prisma/client";

export const CurrentCashier = createParamDecorator(
  (data: keyof Cashier, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const cashier = request.user;

    return data ? cashier[data] : cashier;
  },
);
