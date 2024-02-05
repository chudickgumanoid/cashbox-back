import { Cashier } from "@prisma/client";

export const returnCashierShortFields = (cashier: Cashier) => {
  return {
    id: cashier.id,
    login: cashier.login,
    email: cashier.email,
    iin: cashier.iin,
    full_name:
      `${cashier.last_name} ${cashier.first_name} ${cashier.patronymic}`.trim(),
    status: cashier.status,
  };
};

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
