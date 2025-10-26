export interface CreateTripEventDto {
  from: string;
  to: string;
  userId: string;
  tripId: string;
}

export type TripEvent = CreateTripEventDto & {
  id: string;
};
