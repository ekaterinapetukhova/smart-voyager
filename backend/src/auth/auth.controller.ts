import { Body, Controller, Post } from "@nestjs/common";
import { CreateUserDto } from "../user/dto/create-user.dto";
import { UpdateUserVerifiedStatusService } from "../user/service/update-user-verified-status.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterService } from "./service/register.service";
import { LoginService } from "./service/login.service";

@Controller("auth")
export class AuthController {
  public constructor(
    private readonly loginService: LoginService,
    private readonly registerService: RegisterService,
    private readonly updateUserVerifiedStatusService: UpdateUserVerifiedStatusService
  ) {}

  @Post("register")
  public register(@Body() registerDto: CreateUserDto): Promise<void> {
    return this.registerService.execute(registerDto);
  }

  @Post("login")
  public login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
    return this.loginService.execute(loginDto.email, loginDto.password);
  }

  @Post("verify-email")
  public verify(@Body() data: { emailToken: string }): Promise<void> {
    return this.updateUserVerifiedStatusService.execute(data.emailToken);
  }
}
