import { Container } from "../../../components/common/Container.tsx";
import { Title } from "../../../components/common/Title.tsx";
import { LinkTo } from "../../../components/common/LinkTo.tsx";
import { RouterEnum } from "../../../types/router.types.ts";

export function NewTripModeChoiceView() {
  return (
    <Container childrenContainerClassNames="flex-col py-10">
      <Title>Choose Mode</Title>
      <div className="flex gap-x-10 w-xl h-full items-center justify-center">
        <LinkTo label="By yourself" url={RouterEnum.NewTripByUser} type="button" />
        <LinkTo label="By AI" url={RouterEnum.NewTripByAI} type="button" />
      </div>
    </Container>
  );
}
