import { IsString, MinLength } from "class-validator";
import { messageMinText } from "src/helper/lengthMessage";

export class MeasureDto {
  @IsString()
  @MinLength(1, messageMinText(1))
  name: string;

  @MinLength(1, messageMinText(1))
  @IsString()
  full_name: string;

  @IsString()
  code: string;
}
