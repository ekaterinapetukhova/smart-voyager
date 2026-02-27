import { useEffect } from "react";
import { updateUserStore, useUserStore } from "../../store/user-store.ts";
import { Avatar } from "../../components/common/Avatar.tsx";
import { UserIcon } from "../../components/icon/UserIcon.tsx";
import { useApplicationStore } from "../../store/application-store.ts";

export function UserProfileButton() {
  const { user } = useUserStore();

  const { updateUserProfilePopup } = useApplicationStore();

  useEffect(() => {
    void updateUserStore();
  }, []);

  if (!user) {
    return;
  }

  return (
    <div
      className="relative cursor-pointer z-10 group"
      onClick={() => {
        updateUserProfilePopup(true);
      }}
    >
      <div className="md:block hidden">
        <Avatar src={user.avatar} className="size-10 md:size-14" />
        <div className="size-12 md:size-16 absolute -top-1 -left-1 animated-gradient opacity-30 group-hover:opacity-100 group-hover:animate-gradient transition-all duration-500 ease-out -z-10"></div>
      </div>
      <UserIcon className="block md:hidden text-text" />
    </div>
  );
}
