import { IsString, MinLength } from "class-validator";
import { messageMinText } from "src/helper/lengthMessage";

export class UpdatePasswordDto {
  @IsString()
  @MinLength(4, messageMinText(4))
  previosPassword: string;

  @IsString()
  @MinLength(4, messageMinText(4))
  newPassword: string;

  @IsString()
  @MinLength(4, messageMinText(4))
  newPasswordConfirm: string;
}
