import { IsString, MinLength } from "class-validator";
import { messageMinText } from "src/helper/lengthMessage";

export class CreateAddressDto {
  @IsString()
  @MinLength(4, messageMinText(4))
  title: string;

  @IsString()
  @MinLength(4, messageMinText(4))
  address: string;
}
