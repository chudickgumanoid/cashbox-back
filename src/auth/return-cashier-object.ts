import { Cashier } from "@prisma/client";

export const returnCashierFields = (cashier: Cashier) => {
  return {
    id: cashier.id,
    login: cashier.login,
    email: cashier.email,
    iin: cashier.iin,
    first_name: cashier.first_name,
    last_name: cashier.last_name,
    patronymic: cashier.patronymic,
    status: cashier.status,
    updated_at: cashier.updatedAt,
    created_at: cashier.createdAt,
  };
};
