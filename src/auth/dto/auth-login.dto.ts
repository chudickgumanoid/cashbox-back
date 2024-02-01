import { IsOptional, IsString, MinLength } from "class-validator";
import { messageMinText } from "src/helper/lengthMessage";

export class AuthLoginDto {
  @IsString()
  login: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  iin?: string;

  @IsString()
  @MinLength(4, messageMinText(4))
  password: string;
}
