import { Body, Controller, Delete, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { RouteWaypoint } from "@prisma/client";
import { CreateTripPointService } from "./service/create-trip-point.service";
import { createTripPointDtoSchema } from "./dto/create-trip-point.dto";
import { RemoveTripPointService } from "./service/remove-trip-point.service";
import { UpdateTripPointService } from "./service/update-trip-point.service";
import { updateTripPointDtoSchema } from "./dto/update-trip-point.dto";
import { swapTripPointsDtoSchema } from "./dto/swap-trip-points.dto";
import { SwapTripPointsService } from "./service/swap-trip-points.service";

@Controller("trip-point")
export class TripPointController {
  public constructor(
    private readonly createTripPointService: CreateTripPointService,
    private readonly removeTripPointService: RemoveTripPointService,
    private readonly updateTripPointService: UpdateTripPointService,
    private readonly swapTripPointsService: SwapTripPointsService
  ) {}

  @Post()
  public create(@Body() data: unknown): Promise<RouteWaypoint> {
    const createTripPointDto = createTripPointDtoSchema.parse(data);

    return this.createTripPointService.execute(createTripPointDto);
  }

  @Delete(":id")
  public remove(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.removeTripPointService.execute(id);
  }

  @Put(":id")
  public update(@Param("id", ParseUUIDPipe) id: string, @Body() data: unknown): Promise<void> {
    const updateTripPointDto = updateTripPointDtoSchema.parse(data);

    return this.updateTripPointService.execute(id, updateTripPointDto);
  }

  @Post("swap")
  public swap(@Body() data: unknown): Promise<void> {
    const swapTripPointsDto = swapTripPointsDtoSchema.parse(data);

    return this.swapTripPointsService.execute(swapTripPointsDto);
  }
}
