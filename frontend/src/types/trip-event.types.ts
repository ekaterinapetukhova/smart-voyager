export interface CreateTripEventDto {
  from: string;
  to: string;
  tripId: string;
}

export type TripEvent = CreateTripEventDto & {
  id: string;
};
