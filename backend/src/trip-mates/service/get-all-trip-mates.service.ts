import { Injectable } from "@nestjs/common";
import { User } from "@prisma/client";
import { GetAllUsersService } from "../../user/service/get-all-users-service";
import { GetFileService } from "../../files/service/get-file.service";

@Injectable()
export class GetAllTripMatesService {
  public constructor(
    private readonly getAllUsersService: GetAllUsersService,
    private readonly getFileService: GetFileService
  ) {}

  public async execute(userId: string): Promise<User[]> {
    const tripMates = await this.getAllUsersService.execute();

    for (const tripMate of tripMates) {
      tripMate.avatar = await this.getFileService.execute(tripMate.id);
    }

    return tripMates.filter((tripMate) => userId !== tripMate.id);
  }
}
