import { useLocation } from "react-router-dom";
import { LinkTo } from "../common/LinkTo.tsx";
import { RouterEnum } from "../../types/router.types.ts";
import { Logo } from "../logo/Logo.tsx";
import { UserProfileButton } from "../../features/user-profile/UserProfileButton.tsx";

export function Sidebar() {
  const location = useLocation();

  const menuItems = {
    home: {
      name: "Trips",
      path: RouterEnum.Trips,
    },
    tripMates: {
      name: "Trip Mates",
      path: RouterEnum.TripMates,
    },
    chats: {
      name: "Chats",
      path: RouterEnum.Chats,
    },
  };

  const renderMenuItems = Object.values(menuItems).map((value) => {
    return (
      <li key={value.name}>
        <LinkTo
          type="link"
          label={value.name}
          url={value.path}
          isActive={value.path === (location.pathname as RouterEnum)}
        />
      </li>
    );
  });

  return (
    <div className="py-4 w-72 flex flex-col items-center justify-between bg-gradient-to-b from-[#12001F] via-[#1A0B2E] to-[#07060C] px-5 shadow-[1px_1px_10px_rgba(255,9,238,0.4)]">
      <Logo />
      <ul className="flex flex-col gap-y-4 items-center">{renderMenuItems}</ul>
      <UserProfileButton />
    </div>
  );
}
