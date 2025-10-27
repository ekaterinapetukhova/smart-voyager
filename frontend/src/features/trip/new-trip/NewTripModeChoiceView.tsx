import { Container } from "../../../components/common/Container.tsx";
import { Title } from "../../../components/common/Title.tsx";
import { RouterEnum } from "../../../types/router.types.ts";
import { ButtonLink } from "../../../components/common/ButtonLink.tsx";

export function NewTripModeChoiceView() {
  return (
    <Container childrenContainerClassNames="flex items-center flex-col h-full">
      <Title>How do you want to plan your trip?</Title>
      <div className="flex gap-x-10 w-xl h-full items-center justify-center">
        <ButtonLink
          size="large"
          label="By yourself"
          componentVariants={{
            link: {
              selected: true,
              url: RouterEnum.NewTripByUser,
            },
          }}
        />
        <ButtonLink
          size="large"
          label="By AI"
          componentVariants={{
            link: {
              selected: true,
              url: RouterEnum.NewTripByAI,
            },
          }}
        />
      </div>
    </Container>
  );
}
