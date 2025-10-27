import { useState } from "react";
import { Container } from "../../components/common/Container.tsx";
import { useTripMates } from "../../hooks/use-trip-mates.ts";
import { Popup } from "../../components/common/Popup.tsx";
import { Form } from "../../components/common/form/Form.tsx";
import { validChatMessageSchema } from "../../validation/chat.validation.ts";
import { useChat } from "../../hooks/use-chat.ts";
import { TripMateCard } from "./TripMateCard.tsx";

export function TripMatesView() {
  const { data: tripMates } = useTripMates();
  const { askForChat } = useChat();

  const [showPopup, setShowPopup] = useState(false);
  const [selectedTripMateId, setSelectedTripMateId] = useState("");

  const tripMatesList = tripMates?.map((tripMate) => {
    return (
      <TripMateCard
        key={tripMate.id}
        tripMate={tripMate}
        onClick={() => {
          setShowPopup(true);
          setSelectedTripMateId(tripMate.id);
        }}
      />
    );
  });

  return (
    <>
      <Container>
        <ul className="grid grid-cols-[repeat(auto-fit,_10rem)] gap-4">{tripMatesList}</ul>
      </Container>
      {showPopup && selectedTripMateId && (
        <Popup
          closePopup={() => {
            setShowPopup(false);
          }}
        >
          <Form
            fields={{
              content: { value: "", type: "text" },
            }}
            checkValidation={validChatMessageSchema.parse}
            sendRequest={(data) => askForChat({ recipientId: selectedTripMateId, content: data.content })}
            buttonText="Send"
            formClassNames="items-center w-full"
            onSuccess={() => {
              setShowPopup(false);
            }}
          />
        </Popup>
      )}
    </>
  );
}
