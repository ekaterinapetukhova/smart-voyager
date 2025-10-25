import { Container } from "../../components/common/Container.tsx";
import { RouterEnum } from "../../types/router.types.ts";
import { ButtonLink } from "../../components/common/ButtonLink.tsx";

export function NotFoundView() {
  return (
    <Container childrenContainerClassNames="flex-col items-center justify-center">
      <h1 className="text-text">Oops, page is not found...</h1>
      <div className="w-1/3">
        <ButtonLink
          size="large"
          label="Back to authorized page"
          componentVariants={{
            link: {
              selected: true,
              url: RouterEnum.Auth,
            },
          }}
        />
      </div>
    </Container>
  );
}
