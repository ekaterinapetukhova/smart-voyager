import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/create-user.dto";
import { CreateUserService } from "src/user/service/create-user.service";

@Injectable()
export class RegisterService {
  public constructor(private readonly createUserService: CreateUserService) {}

  public async execute(registerDto: CreateUserDto): Promise<void> {
    await this.createUserService.execute(registerDto);
  }
}
