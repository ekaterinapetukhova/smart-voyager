import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../../user/dto/create-user.dto";
import { CreateUserService } from "../../user/service/create-user.service";
import { MailService } from "../../mail/mail.service";
import { ConflictError } from "../../error/conflict.error";
import { GetUserByEmailService } from "../../user/service/get-user-by-email.service";

@Injectable()
export class RegisterService {
  public constructor(
    private readonly createUserService: CreateUserService,
    private readonly mailService: MailService,
    private readonly getUserByEmailService: GetUserByEmailService
  ) {}

  public async execute(registerDto: CreateUserDto): Promise<void> {
    const existingUser = await this.getUserByEmailService.execute(registerDto.email);

    if (existingUser && existingUser.verified) {
      throw new ConflictError("User with such email already exists");
    }

    await this.createUserService.execute(registerDto);
    await this.mailService.execute(registerDto);
  }
}
