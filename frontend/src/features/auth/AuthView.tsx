import { LinkTo } from "../../components/common/LinkTo.tsx";
import { RouterEnum } from "../../types/router.types.ts";
import { Container } from "../../components/common/Container.tsx";
import { Logo } from "../../components/logo/Logo.tsx";

export function AuthView() {
  const authItems = {
    registration: { name: "Sign up", path: RouterEnum.Registration },
    login: { name: "Sign in", path: RouterEnum.Login },
  };

  const authItemsList = Object.values(authItems).map(({ name, path }) => {
    return (
      <li key={name}>
        <LinkTo type="button" label={name} url={path} />
      </li>
    );
  });

  return (
    <Container childrenContainerClassNames="flex-col pt-10 pb-20 h-full">
      <Logo />
      <p className="text-text font-medium text-center w-3/4 text-xl grow">
        Create personalized trips, explore smart routes powered by AI, and connect with travel buddies who share your
        vibe. Easily edit your journeys, track your budget, and turn every idea into a real adventure.
      </p>
      <ul className="flex flex-col gap-y-5 w-52 ">{authItemsList}</ul>
    </Container>
  );
}
