import { IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { IsEmailFormat } from "../../decorators/email.decorator";
import { messageMaxText, messageMinText } from "src/helper/lengthMessage";

export class AuthRegisterDto {
  @IsString()
  @MinLength(1, messageMinText(1))
  login: string;

  @IsString()
  @IsEmailFormat({ message: "Invalid email format" })
  email: string;

  @IsString()
  @MinLength(4, { message: "Min length name 4 symbols" })
  password: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsOptional()
  @IsString()
  patronymic: string;

  @MinLength(12, messageMinText(12))
  @MaxLength(12, messageMaxText(12))
  @IsString()
  iin: string;
}
