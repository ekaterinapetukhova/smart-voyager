import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class GetPlannedTripsService {
  public constructor(private readonly prisma: PrismaService) {}

  public execute(userId: string): Promise<
    Prisma.TripGetPayload<{
      include: {
        event: true;
        controlList: true;
        collaborators: {
          select: {
            id: true;
            avatar: true;
            name: true;
          };
        };
      };
    }>[]
  > {
    return this.prisma.trip.findMany({
      where: {
        OR: [
          { userId },
          {
            collaborators: {
              some: {
                id: userId,
              },
            },
          },
        ],
        event: {
          isNot: null,
        },
      },
      include: {
        event: true,
        controlList: true,
        collaborators: {
          select: {
            id: true,
            avatar: true,
            name: true,
          },
        },
      },
      orderBy: {
        event: {
          from: "desc",
        },
      },
    });
  }
}
