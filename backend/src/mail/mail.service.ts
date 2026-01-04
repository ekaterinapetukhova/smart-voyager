import { Injectable } from "@nestjs/common";
import Jwt from "jsonwebtoken";
import { Resend } from "resend";
import { config } from "../config/config";
import { CreateUserDto } from "../user/dto/create-user.dto";

@Injectable()
export class MailService {
  private resend: Resend;

  public constructor() {
    this.resend = new Resend(config.resendApiKey);
  }

  public async execute(registerDto: CreateUserDto): Promise<void> {
    const userEmail = registerDto.email;

    try {
      const verificationLink = this.generateVerificationToken(userEmail);

      const { data } = await this.resend.emails.send({
        from: "Smart Voyager <onboarding@resend.dev>",
        to: "ohorat228@gmail.com",
        subject: "Verify your email",
        html: `Please click the following link to verify your email: <a href="${verificationLink}">${verificationLink}</a>`,
      });

      console.log("Message sent: %s", data?.id);
    } catch (err) {
      console.error("Error while sending mail", err);
    }
  }

  private generateVerificationToken(userEmail: string): string {
    const payload = {
      email: userEmail,
    };

    const emailToken = Jwt.sign(payload, config.secretKey, {
      expiresIn: "1h",
    });

    return `${config.frontendUrl}/verify-email?token=${emailToken}`;
  }
}
