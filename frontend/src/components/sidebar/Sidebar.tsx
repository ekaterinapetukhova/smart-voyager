import { useLocation } from "react-router-dom";
import { LinkTo } from "../common/LinkTo.tsx";
import { RouterEnum } from "../../types/router.types.ts";
import { Logo } from "../logo/Logo.tsx";
import { UserProfileButton } from "../../features/user-profile/UserProfileButton.tsx";
import { ReadyTripIcon } from "../icon/ReadyTripIcon.tsx";
import { DraftTripIcon } from "../icon/DraftTripIcon.tsx";
import { TripMatesIcon } from "../icon/TripMatesIcon.tsx";
import { ChatIcon } from "../icon/ChatIcon.tsx";

export function Sidebar() {
  const location = useLocation();

  const menuItems = {
    plannedTrips: {
      name: "Planned trips",
      path: RouterEnum.PlannedTrips,
      icon: <ReadyTripIcon />,
    },
    draftTrips: {
      name: "Draft trips",
      path: RouterEnum.DraftTrips,
      icon: <DraftTripIcon />,
    },
    tripMates: {
      name: "Trip Mates",
      path: RouterEnum.TripMates,
      icon: <TripMatesIcon />,
    },
    chats: {
      name: "Chats",
      path: RouterEnum.Chats,
      icon: <ChatIcon />,
    },
  };

  const renderMenuItems = Object.values(menuItems).map((value) => {
    return (
      <>
        <li className="hidden md:block" key={`${value.name}-desktop`}>
          <LinkTo label={value.name} url={value.path} isActive={value.path === (location.pathname as RouterEnum)} />
        </li>
        <li className="block md:hidden" key={`${value.name}-mobile`}>
          <LinkTo icon={value.icon} url={value.path} isActive={value.path === (location.pathname as RouterEnum)} />
        </li>
      </>
    );
  });

  return (
    <div className="py-4 w-full md:w-72 flex md:flex-col items-center justify-between gap-x-8 bg-gradient-to-b from-[#12001F] via-[#1A0B2E] to-[#07060C] px-5 shadow-[1px_1px_10px_rgba(255,9,238,0.4)] h-20 md:h-full relative z-10">
      <div className="hidden md:block">
        <Logo />
      </div>
      <ul className="flex md:flex-col justify-between w-full gap-x-8 gap-y-4 items-center">{renderMenuItems}</ul>
      <UserProfileButton />
    </div>
  );
}
