import { Container } from "../common/Container.tsx";
import Logo from "../../assets/icons/logo.png";
import { LinkTo } from "../common/LinkTo.tsx";
import { useTokenStore } from "../../store/user-store.ts";
import { Button } from "../common/Button.tsx";
import { RouterEnum } from "../../router/router.types.ts";

// enum MenuItems {
//   Home = "/",
//   TripMates = "/trip-mates",
// }

const menuItems = {
  home: {
    name: "Home",
    path: RouterEnum.Home,
  },
  tripMates: {
    name: "Trip Mates",
    path: RouterEnum.TripMates,
  },
};

enum AuthItems {
  Registration = "/registration",
  Login = "/login",
}

export const Header = () => {
  const isAuth = !!useTokenStore((s) => s.token);
  const logout = useTokenStore((s) => s.logout);

  const menuItemsList = Object.values(menuItems).map((value) => {
    return (
      <li key={value.name}>
        <LinkTo label={value.name} url={value.path} />
      </li>
    );
  });

  const authItemsList = Object.entries(AuthItems).map(([name, path]) => {
    return (
      <li key={name}>
        <LinkTo label={name} url={path} />
      </li>
    );
  });

  return (
    <header className="py-2.5">
      <Container className="flex items-center justify-between">
        <LinkTo label="Logo" url="/" img={true} src={Logo} imgClassNames="h-20" />
        <nav>
          <ul className="flex gap-x-5">{menuItemsList}</ul>
        </nav>
        {isAuth ? (
          <div className="flex gap-x-4">
            <LinkTo label="My profile" url={RouterEnum.User} />
            <Button label="Log out" onClick={logout} />
          </div>
        ) : (
          <ul className="flex gap-x-2">{authItemsList}</ul>
        )}
      </Container>
    </header>
  );
};
