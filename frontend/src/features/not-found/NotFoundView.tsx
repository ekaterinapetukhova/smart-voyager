import { Container } from "../../components/common/Container.tsx";
import { LinkTo } from "../../components/common/LinkTo.tsx";
import { RouterEnum } from "../../types/router.types.ts";

export function NotFoundView() {
  return (
    <Container childrenContainerClassNames="flex-col items-center justify-center">
      <h1 className="text-text">Oops, page is not found...</h1>
      <div className="w-1/3">
        <LinkTo label="Back to authorized page" url={RouterEnum.Auth} type="button" />
      </div>
    </Container>
  );
}
