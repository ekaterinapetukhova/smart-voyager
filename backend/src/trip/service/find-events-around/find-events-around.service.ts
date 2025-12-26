import { Injectable } from "@nestjs/common";
import { AroundEventsItem } from "@prisma/client";
import { PrismaService } from "../../../prisma/prisma.service";
import { FindEventsAroundAgentOutput } from "../../../openai/agents/find-events-around.agent";

@Injectable()
export class FindEventsAroundItemService {
  public constructor(private readonly prisma: PrismaService) {}

  public async createMany(data: FindEventsAroundAgentOutput, tripId: string): Promise<AroundEventsItem[]> {
    await this.prisma.aroundEventsItem.deleteMany({
      where: {
        tripId,
      },
    });

    return this.prisma.aroundEventsItem.createManyAndReturn({
      data: data.events.map((item) => ({ ...item, tripId })),
    });
  }
}
