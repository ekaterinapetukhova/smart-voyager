import { LinkTo } from "../common/LinkTo.tsx";
import { RouterEnum } from "../../router/router.types.ts";
import { UserProfileDropdown } from "../header/UserProfileDropdown.tsx";
import { useTokenStore } from "../../store/user-store.ts";
import { Logo } from "../logo/Logo.tsx";

export function Sidebar() {
  const isAuth = !!useTokenStore((s) => s.token);

  const menuItems = {
    home: {
      name: "Home",
      path: RouterEnum.Index,
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
        <LinkTo type="link" label={value.name} url={value.path} />
      </li>
    );
  });

  return (
    <div className="w-1/5 flex flex-col justify-between bg-gradient-to-b from-[#12001F] via-[#1A0B2E] to-[#07060C] px-5 shadow-[1px_1px_10px_rgba(255,9,238,0.4)] ">
      <Logo />
      <div>
        <ul className="flex flex-col gap-y-5">{renderMenuItems}</ul>
      </div>
      <UserProfileDropdown />
    </div>
  );
}
