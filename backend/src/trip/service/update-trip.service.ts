import { Injectable } from "@nestjs/common";
import { PrismaService } from "../../prisma/prisma.service";
import { UpdateTripDto } from "../dto/update-trip.dto";
import { NotFoundError } from "../../error/not-found.error";

@Injectable()
export class UpdateTripService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(id: string, data: UpdateTripDto): Promise<void> {
    const trip = await this.prisma.trip.findUnique({
      where: {
        id,
      },
    });

    if (!trip) {
      throw new NotFoundError(`Trip with id ${id} not found`);
    }

    await this.prisma.trip.update({
      where: {
        id,
      },
      data: {
        ...data,
      },
    });
  }
}
