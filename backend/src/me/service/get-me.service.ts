import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetFileService } from "../../files/service/get-file.service";
import { GetMeDto } from "../../auth/dto/get-me.dto";

@Injectable()
export class GetMeService {
  public constructor(private readonly getFileService: GetFileService) {}

  public async execute(user: User): Promise<GetMeDto> {
    const avatar = await this.getFileService.execute(user.id);

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      birthDate: user.birthDate,
      country: user.country,
      city: user.city,
      languages: user.languages,
      description: user.description,
      tripInterest: user.tripInterest,
      tripGoals: user.tripGoals,
      avatar,
    };
  }
}
