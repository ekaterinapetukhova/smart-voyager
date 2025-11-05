import { Popup } from "../../components/common/Popup.tsx";
import { validChatMessageSchema } from "../../validation/chat.validation.ts";
import { useChat } from "../../hooks/use-chat.ts";
import { Input, useForm } from "../../components/common/form/useForm.tsx";
import { updateUserStore } from "../../store/user-store.ts";
import { Title } from "../../components/common/Title.tsx";

interface TripMatesPopupProps {
  onClose: () => void;
  recipientId: string;
}

export function TripMatesPopup(props: TripMatesPopupProps) {
  const { askForChat } = useChat();

  const form = useForm({
    initialData: {
      content: "",
    },
    validation: validChatMessageSchema,
    submit: {
      fn: async () => {
        await askForChat({ content: form.data.content, recipientId: props.recipientId });
      },
      onSuccess: () => {
        void updateUserStore();
        props.onClose();
      },
    },
  });

  return (
    <Popup closePopup={props.onClose} containerClassName="w-1/3">
      <div className="py-4 px-6 h-full flex flex-col gap-y-4 overflow-auto">
        <Title classNames="text-xl text-center">Send your first message</Title>
        <Input form={form} fieldKey="content" type="textarea" />
        <div className="w-1/2 h-12 mx-auto">
          <form.SubmitButton label="Send" size="medium" />
        </div>
      </div>
    </Popup>
  );
}
