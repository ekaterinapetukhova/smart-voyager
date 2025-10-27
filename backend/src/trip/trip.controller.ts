import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { Prisma, Trip, User } from "@prisma/client";
import { GetUser } from "../auth/user.decorator";
import { CreateTripService } from "./service/create-trip.service";
import { createTripDtoSchema } from "./dto/create-trip.dto";
import { GetPlannedTripsService } from "./service/get-planned-trips.service";
import { GetTripByIdService, orderedTripPointsIncludePart } from "./service/get-trip-by-id.service";
import { updateTripDtoSchema } from "./dto/update-trip.dto";
import { UpdateTripService } from "./service/update-trip.service";
import { GetAllDraftTripsService } from "./service/get-all-draft-trips.sevice";

@Controller("trip")
export class TripController {
  public constructor(
    private readonly createTripService: CreateTripService,
    private readonly getPlannedTripsService: GetPlannedTripsService,
    private readonly getTripByIdService: GetTripByIdService,
    private readonly updateTripService: UpdateTripService,
    private readonly getAllDraftTripsService: GetAllDraftTripsService
  ) {}

  @Post()
  public create(@Body() data: unknown, @GetUser() user: User): Promise<Trip> {
    const createTripDto = createTripDtoSchema.parse(data);

    return this.createTripService.execute(createTripDto, user.id);
  }

  @Get("planned")
  public getAll(@GetUser() user: User): Promise<Prisma.TripGetPayload<{ include: { event: true } }>[]> {
    return this.getPlannedTripsService.execute(user.id);
  }

  @Get("drafts")
  public getAllDrafts(@GetUser() user: User): Promise<Trip[]> {
    return this.getAllDraftTripsService.execute(user.id);
  }

  @Get(":id")
  public getById(@Param("id", ParseUUIDPipe) id: string): Promise<
    Prisma.TripGetPayload<{
      include: { tripPoints: true; event: true };
    }>
  > {
    return this.getTripByIdService.execute(id, { ...orderedTripPointsIncludePart, event: true });
  }

  @Patch(":id")
  public update(@Param("id", ParseUUIDPipe) id: string, @Body() data: unknown): Promise<void> {
    const updateTripDto = updateTripDtoSchema.parse(data);

    return this.updateTripService.execute(id, updateTripDto);
  }
}
