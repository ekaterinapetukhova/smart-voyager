import { Body, Controller, Post } from "@nestjs/common";
import z from "zod";
import { createUserDtoSchema } from "../user/dto/create-user.dto";
import { UpdateUserVerifiedStatusService } from "../user/service/update-user-verified-status.service";
import { loginDtoSchema } from "./dto/login.dto";
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
  public register(@Body() data: unknown): Promise<void> {
    const createUserDto = createUserDtoSchema.parse(data);

    return this.registerService.execute(createUserDto);
  }

  @Post("login")
  public login(@Body() data: unknown): Promise<{ token: string }> {
    const loginDto = loginDtoSchema.parse(data);

    return this.loginService.execute(loginDto.email, loginDto.password);
  }

  @Post("verify-email")
  public verify(@Body() data: unknown): Promise<{ token: string }> {
    const validEmailToken = z
      .object({
        emailToken: z.string(),
      })
      .parse(data);

    return this.updateUserVerifiedStatusService.execute(validEmailToken.emailToken);
  }
}
