import { Popup } from "../../components/common/Popup.tsx";
import { validChatMessageSchema } from "../../validation/chat.validation.ts";
import { useChat } from "../../hooks/use-chat.ts";
import { Input, useForm } from "../../components/common/form/useForm.tsx";
import { Button } from "../../components/common/Button.tsx";
import { updateUserStore, useUserStore } from "../../store/user-store.ts";

interface TripMatesPopupProps {
  onClose: () => void;
}

export function TripMatesPopup(props: TripMatesPopupProps) {
  const { user } = useUserStore();

  const { askForChat } = useChat();
  
  const form = useForm({
    initialData: {
      content: "",
    },
    validation: validChatMessageSchema,
  });

  if (!user) {
    return;
  }

  return (
    <Popup closePopup={props.onClose}>
      <Input label="Send your first message" form={form} fieldKey="content" type="text" />
      <div className="w-xs mx-auto">
        <Button
          label="send"
          size="medium"
          onClick={async () => {
            if (form.isValid) {
              await askForChat({ content: form.data.content, recipientId: user.id });

              void updateUserStore();
            }
            props.onClose();
          }}
        />
      </div>
    </Popup>
  );
}
