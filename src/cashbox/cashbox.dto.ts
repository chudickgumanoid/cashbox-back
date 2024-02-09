import { IsInt, IsString } from "class-validator";

export class CashboxDto {
  @IsString()
  title: string;

  @IsInt()
  addressId: number;
}
