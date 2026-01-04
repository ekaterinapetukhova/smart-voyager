import { useState } from "react";
import { IconDeviceFloppy, IconEdit } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Trip } from "../../../../types/trip.types.ts";
import { useTripApi } from "../../../../hooks/use-trip-api.ts";
import { authorizedFetch } from "../../../../utils/authorized-fetch.ts";
import { downloadArrayBuffer } from "../../../../utils/download-array-buffer.ts";
import { TextInput } from "../../../../components/common/TextInput.tsx";
import { Title } from "../../../../components/common/Title.tsx";
import { Button } from "../../../../components/common/Button.tsx";
import { RouterEnum } from "../../../../types/router.types.ts";

interface TripHeaderProps {
  trip: Trip;
}

export function TripHeader(props: TripHeaderProps) {
  const { updateTrip, useCreateControlListByAI, useRemoveTrip } = useTripApi();

  const [editTitleMode, setEditTitleMode] = useState(false);
  const [newTitle, setNewTitle] = useState(props.trip.name);

  const navigate = useNavigate();

  const createControlListByAI = useCreateControlListByAI();

  const removeTrip = useRemoveTrip(() => void navigate(RouterEnum.PlannedTrips));

  const generatePDF = async () => {
    const response: ArrayBuffer = await authorizedFetch()({
      method: "POST",
      path: `pdf/${props.trip.id}`,
      isBinary: true,
    });

    downloadArrayBuffer(response, "trip.pdf");
  };

  const generatePDFMutation = useMutation({
    mutationFn: generatePDF,
  });

  return (
    <div className="flex flex-col gap-y-5 items-center w-full">
      <div className="w-full">
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
              className="cursor-pointer text-text inline-block ml-2 size-6 md:size-10 -mt-1 hover:text-accent transition"
              onClick={() => {
                void updateTrip.mutateAsync({ name: newTitle, id: props.trip.id }).then(() => {
                  setEditTitleMode(false);
                });
              }}
            />
          </div>
        ) : (
          <Title classNames="print:text-center font-bold !text-accent">
            {props.trip.name}
            <IconEdit
              stroke={2}
              className="cursor-pointer text-text inline-block ml-2 -mt-2 size-6 md:size-10 hover:text-accent transition print:hidden"
              onClick={() => {
                setEditTitleMode(true);
              }}
            />
          </Title>
        )}
      </div>
      <div className="flex gap-x-4 w-full sm:w-2/5 print:hidden">
        <Button
          label="Get PDF"
          size="medium"
          isLoading={generatePDFMutation.isPending}
          onClick={() => {
            generatePDFMutation.mutate();
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
        {/*{props.trip.event && (*/}
        {/*  <Button*/}
        {/*    label="Find events around"*/}
        {/*    size="medium"*/}
        {/*    onClick={() => {*/}
        {/*      findEventsAroundByAI.mutate(props.trip.id);*/}
        {/*    }}*/}
        {/*    isLoading={findEventsAroundByAI.isPending}*/}
        {/*  />*/}
        {/*)}*/}
        <Button
          label="Remove trip"
          size="medium"
          onClick={() => {
            removeTrip.mutate(props.trip.id);
          }}
          isLoading={removeTrip.isPending}
        />
      </div>
    </div>
  );
}
