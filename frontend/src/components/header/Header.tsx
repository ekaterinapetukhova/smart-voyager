import { Container } from "../common/Container.tsx";
import Logo from "../../assets/icons/logo.png";
import { LinkTo } from "../common/LinkTo.tsx";
import { RouterEnum } from "../../router/router.types.ts";
import { UserProfileDropdown } from "./UserProfileDropdown.tsx";

const menuItems = {
  home: {
    name: "Home",
    path: RouterEnum.Index,
  },
  tripMates: {
    name: "Trip Mates",
    path: RouterEnum.TripMates,
  },
};

export const Header = () => {
  const menuItemsList = Object.values(menuItems).map((value) => {
    return (
      <li key={value.name}>
        <LinkTo label={value.name} url={value.path} />
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
        <UserProfileDropdown />
      </Container>
    </header>
  );
};
