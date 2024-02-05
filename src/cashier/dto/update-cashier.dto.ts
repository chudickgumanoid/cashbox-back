import { IsOptional, IsString, MinLength } from "class-validator";
import { IsEmailFormat } from "src/decorators/email.decorator";
import { messageMinText } from "src/helper/lengthMessage";

export class UpdateProfileDto {
  @IsString()
  login: string;

  @IsString()
  @IsEmailFormat({ message: "Invalid email format" })
  email: string;

  @IsString()
  iin: string;

  @IsString()
  first_name: string;

  @IsString()
  last_name: string;

  @IsString()
  @IsOptional()
  patronymic: string;

  @IsString()
  @MinLength(4, messageMinText(4))
  password: string;
}
