import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../common/Button.tsx";
import { LinkTo } from "../common/LinkTo.tsx";
import { RouterEnum } from "../../router/router.types.ts";
import { useTokenStore, useUserStore } from "../../store/user-store.ts";

import { Avatar } from "../common/Avatar.tsx";

interface UserProfileItems {
  label: string;
  path?: string;
  onClick?: () => void;
}

export function UserProfileDropdown() {
  const { user } = useUserStore();

  const logout = useTokenStore((s) => s.logout);

  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const userProfileItems: Record<string, UserProfileItems> = {
    routes: {
      label: "Routes",
      path: RouterEnum.UserRoutes,
    },
    chats: {
      label: "Chats",
      path: RouterEnum.UserChats,
    },
    settings: {
      label: "Settings",
      path: RouterEnum.UserSettings,
    },
    logout: {
      label: "Logout",
      onClick: () => {
        logout();
        void navigate(RouterEnum.Index);
      },
    },
  };

  const options = Object.values(userProfileItems).map((value) => {
    return (
      <li key={value.label}>
        {value.path ? (
          <LinkTo label={value.label} url={value.path} />
        ) : (
          <Button label={value.label} onClick={value.onClick} />
        )}
      </li>
    );
  });

  return (
    <div className="relative w-30 flex justify-end">
      <div
        className="cursor-pointer flex gap-x-4 items-center justify-end"
        onClick={() => {
          setShowDropdown(!showDropdown);
        }}
      >
        <span className="font-medium">{user?.name}</span>
        <Avatar src={user?.avatar} className="size-10" />
      </div>

      {showDropdown && (
        <div className="absolute right-0 bg-white w-full top-10 z-10">
          <ul className="flex flex-col items-end gap-y-2 p-2">{options}</ul>
        </div>
      )}
    </div>
  );
}
