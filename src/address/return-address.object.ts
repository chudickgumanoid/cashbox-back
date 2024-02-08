import { Prisma } from "@prisma/client";

export const returnAddressObject: Prisma.AddressSelect = {
  id: true,
  title: true,
  address: true,
};
