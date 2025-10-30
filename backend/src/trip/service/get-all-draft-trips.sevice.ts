import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";

@Injectable()
export class GetAllDraftTripsService {
  public constructor(private readonly prisma: PrismaService) {}

  public execute(userId: string): Promise<
    Prisma.TripGetPayload<{
      include: {
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
        event: null,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        controlList: true,
        collaborators: {
          select: {
            id: true,
            avatar: true,
            name: true,
          },
        },
      },
    });
  }
}
