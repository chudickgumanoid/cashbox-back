import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthRegisterDto } from "./dto/auth-register.dto";
import { AuthLoginDto } from "./dto/auth-login.dto";

@Controller("")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(200)
  @Post("register")
  @UsePipes(new ValidationPipe())
  async register(@Body() dto: AuthRegisterDto) {
    return this.authService.register(dto);
  }

  @HttpCode(200)
  @Post("login")
  @UsePipes(new ValidationPipe())
  async login(@Body() dto: AuthLoginDto) {
    return this.authService.login(dto);
  }
}
