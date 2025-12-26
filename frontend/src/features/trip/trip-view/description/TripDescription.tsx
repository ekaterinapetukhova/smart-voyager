import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import { useState } from "react";
import { SubTitle } from "../../../../components/common/SubTitle.tsx";
import { useTripApi } from "../../../../hooks/use-trip-api.ts";
import { Textarea } from "../../../../components/common/Textarea.tsx";
import { TripBlockWrapper } from "./TripBlockWrapper.tsx";

interface TripDescriptionProps {
  description: string;
  tripId: string;
}

export function TripDescription(props: TripDescriptionProps) {
  const { updateTrip } = useTripApi();

  const [editMode, setEditMode] = useState(false);
  const [newDescription, setNewDescription] = useState(props.description);

  return (
    <TripBlockWrapper>
      <SubTitle content="Description" />
      {!editMode ? (
        <p className="text-sm md:text-base text-text print:text-justify leading-7">
          {props.description.trim()}
          <IconEdit
            stroke={2}
            className="cursor-pointer text-text inline-block ml-2 -mt-2 size-6 md:size-6 hover:text-accent transition print:hidden"
            onClick={() => {
              setEditMode(true);
            }}
          />
        </p>
      ) : (
        <div className="flex">
          <Textarea
            value={newDescription}
            onChange={(e) => {
              setNewDescription(e.target.value);
            }}
          />
          <IconDeviceFloppy
            stroke={2}
            className="cursor-pointer text-text inline-block ml-2 size-6 md:size-10 -mt-1 hover:text-accent transition"
            onClick={() => {
              void updateTrip.mutateAsync({ description: newDescription, id: props.tripId }).then(() => {
                setEditMode(false);
              });
            }}
          />
        </div>
      )}
    </TripBlockWrapper>
  );
}
