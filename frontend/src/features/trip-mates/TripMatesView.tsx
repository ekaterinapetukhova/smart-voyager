import { useState } from "react";
import { Container } from "../../components/common/Container.tsx";
import { useTripMates } from "../../hooks/use-trip-mates.ts";
import { Button } from "../../components/common/Button.tsx";
import { Popup } from "../../components/common/Popup.tsx";
import { Form } from "../../components/common/Form.tsx";
import { validChatMessageSchema } from "../../validation/chat.validation.ts";
import { useChat } from "../../hooks/use-chat.ts";

export function TripMatesView() {
  const { data: tripMates } = useTripMates();
  const { askForChat } = useChat();

  const [showPopup, setShowPopup] = useState(false);
  const [selectedTripMateId, setSelectedTripMateId] = useState<string | null>(null);

  const tripMatesList = tripMates?.map((tripMate) => {
    return (
      <li className="">
        <img className="size-20 object-cover" src={`data:image/jpeg;base64,${tripMate.avatar}`} alt={tripMate.name} />
        <div>{tripMate.name}</div>
        <div>{tripMate.surname}</div>
        <Button
          label="Ask for Chat"
          onClick={() => {
            setShowPopup(true);
            setSelectedTripMateId(tripMate.id as string);
          }}
        />
      </li>
    );
  });

  return (
    <section>
      <Container>
        <ul>{tripMatesList}</ul>
      </Container>
      {showPopup && selectedTripMateId && (
        <Popup
          title="Ask for chat"
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
    </section>
  );
}
