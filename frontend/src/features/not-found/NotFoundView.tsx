import { Container } from "../../components/common/Container.tsx";
import { LinkTo } from "../../components/common/LinkTo.tsx";
import { RouterEnum } from "../../router/router.types.ts";

export function NotFoundView() {
  return (
    <section>
      <Container>
        <h1>Page is not found</h1>
        <LinkTo label="Back to authorized page" url={RouterEnum.Index} />
      </Container>
    </section>
  );
}
