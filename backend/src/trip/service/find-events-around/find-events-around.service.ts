import { Injectable } from "@nestjs/common";
import { AroundEventsItem } from "@prisma/client";
import { PrismaService } from "../../../prisma/prisma.service";

interface FindEventsAroundItemInput {
  name: string;
  place: string;
  date: Date;
  city: string;
}

@Injectable()
export class FindEventsAroundItemService {
  public constructor(private readonly prisma: PrismaService) {}

  public async createMany(data: FindEventsAroundItemInput[], tripId: string): Promise<AroundEventsItem[]> {
    await this.prisma.aroundEventsItem.deleteMany({
      where: {
        tripId,
      },
    });

    return this.prisma.aroundEventsItem.createManyAndReturn({
      data: data.map((item) => ({ ...item, tripId })),
    });
  }
}
