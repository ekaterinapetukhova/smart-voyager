import { Container } from "../../components/common/Container.tsx";
import { Title } from "../../components/common/Title.tsx";
import { Form } from "../../components/common/Form.tsx";
import { ValidUpdateUser, validUserUpdateSchema } from "../../validation/update-user.validation.ts";
import { useUserStore } from "../../store/user-store.ts";
import { authorizedFetch } from "../../utils/authorized-fetch.ts";

export function UserSettingsView() {
  const { user } = useUserStore();

  if (!user) {
    return null;
  }

  const sendRequest = async (data: ValidUpdateUser) => {
    const { patch } = authorizedFetch();

    const response = await patch("user", user.id, data);

    if (!response.ok) {
      throw new Error("Update failed");
    }
  };

  const prepareUpdatedData = (data: Record<string, string>): Partial<ValidUpdateUser> => {
    const updatedData: Partial<ValidUpdateUser> = {};

    Object.keys(data).forEach((key) => {
      let value = data[key];

      console.log(value, key, typeof value);

      if (key === "avatar") {
        const uintArray = new Uint8Array(value as unknown as ArrayBuffer);
        const str = uintArray.reduce((data, byte) => data + String.fromCharCode(byte), "");
        value = btoa(str);
      }

      if (value) {
        updatedData[key as Exclude<keyof ValidUpdateUser, "avatar">] = value;
      }
    });

    return updatedData;
  };

  return (
    <section>
      <Container className="flex flex-col items-center">
        <Title title="Settings" />
        <Form
          buttonText="Update"
          fields={{
            name: { value: user.name, type: "text" },
            surname: { value: user.surname, type: "text" },
            email: { value: user.email, type: "text" },
            birthDate: { value: user.birthDate, type: "date" },
            password: { value: "", type: "password" },
            country: { value: user.country ?? "", type: "text" },
            city: { value: user.city ?? "", type: "text" },
            languages: { value: user.languages ?? "", type: "text" },
            description: { value: user.description ?? "", type: "text" },
            avatar: { value: "", type: "file" },
          }}
          checkValidation={(data) => validUserUpdateSchema.parse(prepareUpdatedData(data))}
          sendRequest={(data) => sendRequest(prepareUpdatedData(data))}
        ></Form>
      </Container>
    </section>
  );
}
