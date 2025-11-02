import { useState } from "react";
import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import { Trip } from "../../../../types/trip.types.ts";
import { useTripApi } from "../../../../hooks/use-trip-api.ts";
import { authorizedFetch } from "../../../../utils/authorized-fetch.ts";
import { downloadArrayBuffer } from "../../../../utils/download-array-buffer.ts";
import { TextInput } from "../../../../components/common/TextInput.tsx";
import { Title } from "../../../../components/common/Title.tsx";
import { Button } from "../../../../components/common/Button.tsx";

interface TripHeaderProps {
  trip: Trip;
}

export function TripHeader(props: TripHeaderProps) {
  const { updateTrip, useCreateControlListByAI } = useTripApi();

  const [editTitleMode, setEditTitleMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const createControlListByAI = useCreateControlListByAI();

  const pdf = async () => {
    const response: ArrayBuffer = await authorizedFetch()({
      method: "POST",
      path: `pdf/${props.trip.id}`,
      isBinary: true,
    });

    downloadArrayBuffer(response, "trip.pdf");
  };

  return (
    <div className="flex justify-between items-center gap-x-10">
      {editTitleMode ? (
        <div className="flex">
          <TextInput
            value={newTitle}
            onChange={(e) => {
              setNewTitle(e.target.value);
            }}
          />
          <IconDeviceFloppy
            stroke={2}
            className="cursor-pointer text-text inline-block ml-2 size-10 -mt-1 hover:text-accent transition"
            onClick={() => {
              void updateTrip.mutateAsync({ name: newTitle, id: props.trip.id }).then(() => {
                setEditTitleMode(false);
              });
            }}
          />
        </div>
      ) : (
        <Title classNames="print:text-center">
          {props.trip.name}
          <IconEdit
            stroke={2}
            className="cursor-pointer text-text inline-block ml-2 -mt-2 size-10 hover:text-accent transition print:hidden"
            onClick={() => {
              setEditTitleMode(true);
            }}
          />
        </Title>
      )}
      <div className="flex gap-x-4 h-14 print:hidden">
        <Button
          label="Get PDF"
          size="medium"
          onClick={() => {
            void pdf();
          }}
        />
        <Button
          label="Get control list"
          size="medium"
          onClick={() => {
            createControlListByAI.mutate(props.trip.id);
          }}
          isLoading={createControlListByAI.isPending}
        />
      </div>
    </div>
  );
}
