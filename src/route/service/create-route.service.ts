import { Injectable } from "@nestjs/common";
import { Route } from "@prisma/client";
import { PrismaService } from "../../prisma/prisma.service";
import { CreateRouteDto } from "../dto/create-route.dto";

@Injectable()
export class CreateRouteService {
  public constructor(private readonly prisma: PrismaService) {}

  public async execute(data: CreateRouteDto): Promise<Route> {
    // const coordinates = data.routePoints.map((point) => {
    //   return `${point.longitude},${point.latitude}`;
    // });

    // const bestWay = await this.calculateBestWay(coordinates);

    return this.prisma.route.create({
      data: {
        name: data.name,
        mode: data.mode,
        type: data.type,
        points: {
          create: data.routePoints,
        },
      },
      include: {
        points: true,
      },
    });
  }

  // private async calculateBestWay(coordsArray: string[]): Promise<GeoapifyResponse> {
  //   const coordinates = coordsArray.join("|");
  //
  //   const queryParams: QueryParams = {
  //     waypoints: coordinates,
  //     mode: "drive",
  //     type: "short",
  //   };
  //
  //   const url = createGeoapifyUrl(queryParams);
  //
  //   const response = await fetch(url);
  //
  //   return (await response.json()) as GeoapifyResponse;
  // }
}
