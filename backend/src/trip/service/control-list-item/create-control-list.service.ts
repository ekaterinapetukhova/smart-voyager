import { Injectable } from "@nestjs/common";
import { ControlListItem } from "@prisma/client";
import { PrismaService } from "../../../prisma/prisma.service";

interface CreateControlListItemInput {
  name: string;
  cost: number;
  description: string;
}

@Injectable()
export class CreateControlListItemService {
  public constructor(private readonly prisma: PrismaService) {}

  public async createMany(data: CreateControlListItemInput[], tripId: string): Promise<ControlListItem[]> {
    await this.prisma.controlListItem.deleteMany({
      where: {
        tripId,
      },
    });

    return this.prisma.controlListItem.createManyAndReturn({
      data: data.map((item) => ({ ...item, tripId })),
    });
  }
}
