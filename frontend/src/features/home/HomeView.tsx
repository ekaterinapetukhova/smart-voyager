import { Map } from "../../components/map/Map.tsx";
import { Container } from "../../components/common/Container.tsx";
import { verifyUserEmail } from "../../mutation/verification.mutation.ts";

export const HomeView = () => {
  const emailToken = new URLSearchParams(window.location.search).get("token");

  if (emailToken) {
    void verifyUserEmail(emailToken);
  }

  return (
    <section>
      <Container>
        <Map />
      </Container>
    </section>
  );
};
