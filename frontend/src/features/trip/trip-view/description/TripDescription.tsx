import { IconDeviceFloppy, IconEdit, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState } from "react";
import { useTripEventApi } from "../../../../hooks/use-trip-event-api.ts";
import { useUserStore } from "../../../../store/user-store.ts";
import { Input, useForm } from "../../../../components/common/form/useForm.tsx";
import { validEventDataSchema } from "../../../../validation/event.validation.ts";
import { Button } from "../../../../components/common/Button.tsx";
import { TextInput } from "../../../../components/common/TextInput.tsx";
import { Title } from "../../../../components/common/Title.tsx";
import { useTripApi } from "../../../../hooks/use-trip-api.ts";
import { Trip } from "../../../../types/trip.types.ts";
import { TripEvent } from "../../../trip-event/TripEvent.tsx";
import { authorizedFetch } from "../../../../utils/authorized-fetch.ts";
import { SubTitle } from "../../../../components/common/SubTitle.tsx";
import { isPrint } from "../../../../utils/is-print.ts";
import { Avatar } from "../../../../components/common/Avatar.tsx";
import { Popup } from "../../../../components/common/Popup.tsx";
import { useChat } from "../../../../hooks/use-chat.ts";
import { ControlListAndBudget } from "./ControlListAndBudget.tsx";

interface TripDescriptionProps {
  trip: Trip;
}

interface EventFormProps {
  tripId: string;
}

interface TripHeaderProps {
  trip: Trip;
}

function TripHeader(props: TripHeaderProps) {
  const { updateTrip, useCreateControlListByAI } = useTripApi();

  const [editTitleMode, setEditTitleMode] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const createControlListByAI = useCreateControlListByAI();

  const pdf = () => {
    void authorizedFetch()({
      method: "POST",
      path: `pdf/${props.trip.id}`,
    });
  };

  return (
    <div className="flex justify-between items-center gap-x-5">
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
        <Button label="Get PDF" size="medium" onClick={pdf} />
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

function EventForm(props: EventFormProps) {
  const { createEvent } = useTripEventApi();

  const { user } = useUserStore();

  const form = useForm({
    initialData: {
      from: new Date(),
      to: new Date(),
    },
    validation: validEventDataSchema,
  });

  if (!user) {
    return;
  }

  const formErrors = form.formErrors.map((error) => {
    return <li className="text-error text-xs">{error}</li>;
  });

  return (
    <div className="flex flex-col gap-y-4 w-xs">
      <div className="flex gap-x-12">
        <Input form={form} type="date" fieldKey="from" label="Start ;)" />
        <Input form={form} type="date" fieldKey="to" label="End ;(" />
      </div>
      <ul className="flex flex-col gap-y-2 text-center">{formErrors}</ul>
      <Button
        label="Select"
        size="large"
        onClick={() => {
          if (form.isValid) {
            createEvent.mutate({
              userId: user.id,
              tripId: props.tripId,
              to: form.data.to.toISOString().split("T")[0],
              from: form.data.from.toISOString().split("T")[0],
            });
          }
        }}
        isLoading={createEvent.isPending}
      />
    </div>
  );
}

export function TripDescription(props: TripDescriptionProps) {
  const [addMatePopupVisible, setAddMatePopupVisible] = useState(false);

  const scrollToMap = () => {
    const tripMap = document.getElementById("tripMap");

    tripMap?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const chat = useChat();

  const { user } = useUserStore();
  
  const tripApi = useTripApi();
  const availableMates: { id: string; avatar: string; name: string }[] = [];
  if (chat.data) {
    for (const c of chat.data) {
      for (const m of c.members) {
        if (
          !availableMates.find((x) => x.id === m.id) &&
          m.id !== user?.id &&
          !props.trip.collaborators.find((e) => e.id === m.id)
        ) {
          availableMates.push({
            id: m.id,
            avatar: m.avatar,
            name: m.name,
          });
        }
      }
    }
  }

  const isControlListEmpty = props.trip.controlList.length === 0;

  return (
    <div id="tripDescription" className="h-screen print:h-fit pt-10 flex flex-col items-center print:w-full">
      <div className="grow flex flex-col ">
        <TripHeader trip={props.trip} />
        <div className="flex grow gap-x-4 pt-5">
          <div className={["flex flex-col gap-y-4", isControlListEmpty ? "text-justify" : "basis-1/2"].join(" ")}>
            <div>
              <SubTitle content="Description" />
              <p className="text-text print:text-justify">{props.trip.description}</p>
            </div>
            <div>
              {props.trip.event && <SubTitle content="Dates" />}
              {!props.trip.event && !isPrint() && <EventForm tripId={props.trip.id} />}
              {props.trip.event && <TripEvent from={props.trip.event.from} to={props.trip.event.to} />}
              <div className="py-4 flex flex-col gap-2 text-text">
                <SubTitle content="Mates" />
                {props.trip.collaborators.map((mate) => {
                  return (
                    <div className="flex gap-x-2 items-center">
                      <Avatar src={mate.avatar} className="size-14 rounded-full" />
                      <span>{mate.name}</span>
                      <IconTrash
                        className="cursor-pointer"
                        onClick={() => {
                          void tripApi.removeTripMate.mutateAsync({ tripId: props.trip.id, mateId: mate.id });
                        }}
                      />
                    </div>
                  );
                })}
                <IconPlus
                  className="cursor-pointer"
                  onClick={() => {
                    setAddMatePopupVisible(true);
                  }}
                />
              </div>
            </div>
          </div>
          {!isControlListEmpty && (
            <div className="basis-1/2 flex flex-col w-full">
              <ControlListAndBudget controlListItems={props.trip.controlList} />
            </div>
          )}
        </div>
      </div>
      <div className="w-24 print:hidden">
        <Button label="Scroll to map" size="small" onClick={scrollToMap} />
      </div>
      {addMatePopupVisible && (
        <Popup
          closePopup={() => {
            setAddMatePopupVisible(false);
          }}
        >
          <div className="w-[70dvw] h-[70dvh]">
            <SubTitle content="Available trip mates" />
            {availableMates.map((mate) => {
              return (
                <div
                  className="flex gap-x-2 text-text items-center cursor-pointer"
                  onClick={() => {
                    void tripApi.addTripMate.mutateAsync({ tripId: props.trip.id, mateId: mate.id }).then(() => {
                      setAddMatePopupVisible(false);
                    });
                  }}
                >
                  <Avatar src={mate.avatar} className="size-14 rounded-full" />
                  <span>{mate.name}</span>
                </div>
              );
            })}
          </div>
        </Popup>
      )}
    </div>
  );
}
