import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { Trip, User } from "@prisma/client";
import { GetUser } from "../auth/user.decorator";
import { CreateTripService } from "./service/create-trip.service";
import { createTripDtoSchema } from "./dto/create-trip.dto";
import { GetAllTripsService } from "./service/get-all-trips.service";
import { GetTripByIdService } from "./service/get-trip-by-id.service";
import { updateTripDtoSchema } from "./dto/update-trip.dto";
import { UpdateTripService } from "./service/update-trip.service";

@Controller("trip")
export class TripController {
  public constructor(
    private readonly createTripService: CreateTripService,
    private readonly getAllTripsService: GetAllTripsService,
    private readonly getTripByIdService: GetTripByIdService,
    private readonly updateTripService: UpdateTripService
  ) {}

  @Post()
  public create(@Body() data: unknown, @GetUser() user: User): Promise<Trip> {
    const createTripDto = createTripDtoSchema.parse(data);

    return this.createTripService.execute(createTripDto, user);
  }

  @Get()
  public getAll(): Promise<Trip[]> {
    return this.getAllTripsService.execute();
  }

  @Get(":id")
  public getById(@Param("id", ParseUUIDPipe) id: string): Promise<Trip> {
    return this.getTripByIdService.execute(id);
  }

  @Patch(":id")
  public update(@Param("id", ParseUUIDPipe) id: string, @Body() data: unknown): Promise<void> {
    const updateTripDto = updateTripDtoSchema.parse(data);

    return this.updateTripService.execute(id, updateTripDto);
  }
}
