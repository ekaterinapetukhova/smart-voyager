import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Put } from "@nestjs/common";
import { Prisma, Trip, User } from "@prisma/client";
import { GetUser } from "../auth/user.decorator";
import { TripPlannerAgent, tripPlannerInputSchema } from "../openai/agents/trip-planner.agent";
import { ControlListCreatorAgent } from "../openai/agents/control-list-creator.agent";
import { FindEventsAroundAgent } from "../openai/agents/find-events-around.agent";
import { CreateTripService } from "./service/create-trip.service";
import { createTripDtoSchema } from "./dto/create-trip.dto";
import { GetPlannedTripsService } from "./service/get-planned-trips.service";
import { GetTripByIdService, orderedTripPointsIncludePart } from "./service/get-trip-by-id.service";
import { updateTripDtoSchema } from "./dto/update-trip.dto";
import { UpdateTripService } from "./service/update-trip.service";
import { GetAllDraftTripsService } from "./service/get-all-draft-trips.sevice";
import { CreateControlListItemService } from "./service/control-list-item/create-control-list.service";
import { AddTripMateService } from "./service/add-trip-mate.service";
import { RemoveTripMateService } from "./service/remove-trip-mate.service";
import { RemoveTripService } from "./service/remove-trip.service";
import { FindEventsAroundItemService } from "./service/find-events-around/find-events-around.service";

@Controller("trip")
export class TripController {
  public constructor(
    private readonly createTripService: CreateTripService,
    private readonly getPlannedTripsService: GetPlannedTripsService,
    private readonly getTripByIdService: GetTripByIdService,
    private readonly updateTripService: UpdateTripService,
    private readonly getAllDraftTripsService: GetAllDraftTripsService,
    private readonly tripPlannerAgent: TripPlannerAgent,
    private readonly controlListCreatorAgent: ControlListCreatorAgent,
    private readonly createControlListItemService: CreateControlListItemService,
    private readonly addTripMateService: AddTripMateService,
    private readonly removeTripMateService: RemoveTripMateService,
    private readonly removeTripService: RemoveTripService,
    private readonly findEventsAroundAgent: FindEventsAroundAgent,
    private readonly findEventsAroundItemService: FindEventsAroundItemService
  ) {}

  @Post()
  public create(@Body() data: unknown, @GetUser() user: User): Promise<Trip> {
    const createTripDto = createTripDtoSchema.parse(data);

    return this.createTripService.execute(createTripDto, user.id);
  }

  @Get("planned")
  public getAll(@GetUser() user: User): Promise<
    Prisma.TripGetPayload<{
      include: {
        event: true;
        user: {
          select: {
            id: true;
            avatar: true;
            name: true;
          };
        };
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
    return this.getPlannedTripsService.execute(user.id);
  }

  @Get("drafts")
  public getAllDrafts(@GetUser() user: User): Promise<
    Prisma.TripGetPayload<{
      include: {
        user: {
          select: {
            id: true;
            avatar: true;
            name: true;
          };
        };
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
    return this.getAllDraftTripsService.execute(user.id);
  }

  @Get(":id")
  public getById(@Param("id", ParseUUIDPipe) id: string): Promise<
    Prisma.TripGetPayload<{
      include: {
        tripPoints: true;
        event: true;
        controlList: true;
        aroundEvent: true;
        user: {
          select: {
            id: true;
            avatar: true;
            name: true;
          };
        };
        collaborators: {
          select: {
            id: true;
            avatar: true;
            name: true;
          };
        };
      };
    }>
  > {
    return this.getTripByIdService.execute(id, {
      ...orderedTripPointsIncludePart,
      event: true,
      controlList: true,
      aroundEvent: true,
      user: {
        select: {
          id: true,
          avatar: true,
          name: true,
        },
      },
      collaborators: {
        select: {
          id: true,
          avatar: true,
          name: true,
        },
      },
    });
  }

  @Patch(":id")
  public update(@Param("id", ParseUUIDPipe) id: string, @Body() data: unknown): Promise<void> {
    const updateTripDto = updateTripDtoSchema.parse(data);

    return this.updateTripService.execute(id, updateTripDto);
  }

  @Put(":tripId/collaborator/:mateId")
  public async addCollaborator(
    @Param("tripId", ParseUUIDPipe) tripId: string,
    @Param("mateId", ParseUUIDPipe) mateId: string
  ): Promise<void> {
    await this.addTripMateService.execute(mateId, tripId);
  }

  @Delete(":tripId/collaborator/:mateId")
  public async removeCollaborator(
    @Param("tripId", ParseUUIDPipe) tripId: string,
    @Param("mateId", ParseUUIDPipe) mateId: string
  ): Promise<void> {
    await this.removeTripMateService.execute(mateId, tripId);
  }

  @Post("ai-create-trip")
  public async createByAI(@GetUser() user: User, @Body() body: unknown): Promise<{ tripId: string } | undefined> {
    const data = tripPlannerInputSchema.parse(body);

    const createTripDto = await this.tripPlannerAgent.execute(data, user.id);

    const trip = await this.createTripService.execute(createTripDto, user.id);

    return {
      tripId: trip.id,
    };
  }

  @Post(":id/ai-create-control-list")
  public async createControlListByAI(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    const trip = await this.getTripByIdService.execute(id, { tripPoints: true, user: true });

    const items = await this.controlListCreatorAgent.execute(trip);

    await this.createControlListItemService.createMany(items.controlList, trip.id);
  }

  @Post(":id/ai-find-events-around")
  public async findEventsAround(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    const trip = await this.getTripByIdService.execute(id, { tripPoints: true, user: true, event: true });

    const items = await this.findEventsAroundAgent.execute(trip);

    await this.findEventsAroundItemService.createMany(
      items.events.map((x) => ({
        ...x,
        date: new Date(x.date),
      })),
      trip.id
    );
  }

  @Delete(":id")
  public async removeTrip(@Param("id", ParseUUIDPipe) id: string): Promise<void> {
    return this.removeTripService.execute(id);
  }
}
