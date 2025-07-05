import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { LoginDto } from "./dto/login.dto";
import { RegisterService } from "./service/register.service";
import { LoginService } from "./service/login.service";

@Controller("auth")
export class AuthController {
  public constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService
  ) {}

  @Post("register")
  public register(@Body() registerDto: CreateUserDto): Promise<void> {
    return this.registerService.execute(registerDto);
  }

  @Post("login")
  public login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.loginService.execute(loginDto.email, loginDto.password);
  }
}
