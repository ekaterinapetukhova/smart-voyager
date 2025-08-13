import { Injectable } from "@nestjs/common";
import nodemailer from "nodemailer";
import Jwt from "jsonwebtoken";
import { config } from "../config/config";
import { CreateUserDto } from "../user/dto/create-user.dto";

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  public constructor() {
    this.transporter = nodemailer.createTransport({
      host: config.emailServer,
      port: config.emailServerPort,
      secure: true,
      auth: {
        user: config.email,
        pass: config.emailPassword,
      },
    });

    void this.verifyConnection();
  }

  public async execute(registerDto: CreateUserDto): Promise<void> {
    const userEmail = registerDto.email;

    try {
      const verificationLink = this.generateVerificationToken(userEmail);

      const info = await this.transporter.sendMail({
        from: config.email,
        to: "ohorat228@gmail.com",
        subject: "Verify your email",
        html: `Please click the following link to verify your email: <a href="${verificationLink}">${verificationLink}</a>`,
      });

      console.log("Message sent: %s", info.messageId);
    } catch (err) {
      console.error("Error while sending mail", err);
    }
  }

  private async verifyConnection(): Promise<void> {
    await this.transporter.verify();
    console.log("Server is ready to take our messages");
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
