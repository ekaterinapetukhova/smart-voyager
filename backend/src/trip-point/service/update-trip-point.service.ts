import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UpdateTripPointDto } from "../dto/update-trip-point.dto";

@Injectable()
export class UpdateTripPointService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(id: string, data: UpdateTripPointDto): Promise<void> {
    await this.prisma.tripPoint.update({
      where: {
        id,
      },
      data,
    });
  }
}
