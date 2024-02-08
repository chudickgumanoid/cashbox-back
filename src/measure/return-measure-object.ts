import { Measure, Prisma } from "@prisma/client";

export const returnMeasureShortFields = (measure: Measure) => {
  return {
    id: measure.id,
    name: measure.name,
    full_name: measure.fullName,
    code: measure.code,
  };
};

export const returnMeasureObject: Prisma.MeasureSelect = {
  id: true,
  code: true,
  name: true,
  fullName: true,
};
