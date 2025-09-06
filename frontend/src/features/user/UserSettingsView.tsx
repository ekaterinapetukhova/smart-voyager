import { Container } from "../../components/common/Container.tsx";
import { Title } from "../../components/common/Title.tsx";
import { Form, FormValues, InputProp } from "../../components/common/Form.tsx";
import { ValidUpdateUser, validUserUpdateSchema } from "../../validation/update-user.validation.ts";
import { updateUserStore, useUserStore } from "../../store/user-store.ts";
import { authorizedFetch } from "../../utils/authorized-fetch.ts";
import { Gender } from "../../types/user.types.ts";

export function UserSettingsView() {
  const { user } = useUserStore();
  const { patch } = authorizedFetch();

  if (!user) return null;

  const fields = {
    name: { value: user.name, type: "text" },
    surname: { value: user.surname, type: "text" },
    email: { value: user.email, type: "text" },
    birthDate: { value: user.birthDate, type: "date" },
    password: { value: "", type: "password" },
    country: { value: user.country ?? "", type: "text" },
    city: { value: user.city ?? "", type: "text" },
    languages: { value: user.languages ?? "", type: "text" },
    description: { value: user.description ?? "", type: "text" },
    avatar: { value: undefined, type: "file" },
    gender: {
      value: user.gender,
      type: "radio",
      options: [Gender.Male, Gender.Female],
    },
  } satisfies Record<string, InputProp>;

  const prepareUpdatedData = (data: FormValues<typeof fields>): Partial<ValidUpdateUser> => {
    const updatedData: Partial<ValidUpdateUser> = {};

    Object.entries(data).forEach(([key, value]) => {
      if (key === "avatar" && value) {
        const uintArray = new Uint8Array(value as unknown as ArrayBuffer);
        const str = uintArray.reduce((acc, byte) => acc + String.fromCharCode(byte), "");

        updatedData.avatar = btoa(str);

        return;
      }

      if (key === "gender") {
        updatedData.gender = value as Gender;

        return;
      }

      if (value !== "" && value !== undefined) {
        updatedData[key as Exclude<keyof ValidUpdateUser, "avatar" | "gender">] = value;
      }
    });

    return updatedData;
  };

  const sendRequest = async (data: Partial<ValidUpdateUser>) => {
    const response = await patch("user", user.id, data);

    if (!response.ok) {
      throw new Error("Update failed");
    }
  };

  return (
    <section>
      <Container className="flex flex-col items-center">
        <Title title="Settings" />
        <Form
          buttonText="Update"
          fields={fields}
          checkValidation={(data) => validUserUpdateSchema.parse(prepareUpdatedData(data))}
          sendRequest={(data) => sendRequest(prepareUpdatedData(data))}
          onSuccess={() => {
            void updateUserStore();
          }}
        />
      </Container>
    </section>
  );
}
