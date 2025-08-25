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
    const users = await this.getAllUsersService.execute();

    for (const user of users) {
      user.avatar = await this.getFileService.execute(user.id);
    }

    return users.filter((user) => userId !== user.id);
  }
}
