import { LinkTo } from "../../components/common/LinkTo.tsx";
import { RouterEnum } from "../../router/router.types.ts";

export function AuthView() {
  const authItems = {
    registration: { name: "Sign up", path: RouterEnum.Registration },
    login: { name: "Sign in", path: RouterEnum.Login },
  };

  const authItemsList = Object.values(authItems).map(({ name, path }) => {
    return (
      <li key={name}>
        <LinkTo label={name} url={path} />
      </li>
    );
  });

  return (
    <div className="h-screen flex items-center justify-center">
      <ul className="flex flex-col items-center">{authItemsList}</ul>
    </div>
  );
}
