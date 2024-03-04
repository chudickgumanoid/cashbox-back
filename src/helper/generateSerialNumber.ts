import moment from "moment";

export const generateSerialNumber = (): string => {
  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();

  const currentDate = moment().format("YYMMDD");

  const serialNumber = `CH${currentDate}${randomPart}`;

  return serialNumber;
};
