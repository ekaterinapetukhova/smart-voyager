import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import Jwt from "jsonwebtoken";
import { GetUserByEmailService } from "../../user/service/get-user-by-email.service";
import { config } from "../../config/config";

@Injectable()
export class LoginService {
  public constructor(private readonly getUserByEmailService: GetUserByEmailService) {}

  public async execute(email: string, password: string): Promise<{ token: string }> {
    const user = await this.getUserByEmailService.execute(email);

    if (!user) {
      throw new UnauthorizedException({
        errorMessage: "Incorrect email or password",
      });
    }

    if (!user.verified) {
      throw new UnauthorizedException({
        errorMessage: "Please, first verify link in your mail",
      });
    }

    const match = await bcrypt.compare(password, user.passwordHash);

    if (!match) {
      throw new UnauthorizedException({
        errorMessage: "Incorrect email or password",
      });
    }

    const payload = {
      id: user.id,
    };

    const token = Jwt.sign(payload, config.secretKey, {
      expiresIn: "1d",
    });

    return { token };
  }
}
