import { useEffect, useState } from "react";
import { updateUserStore, useUserStore } from "../../store/user-store.ts";
import { Avatar } from "../../components/common/Avatar.tsx";
import { UserProfilePopup } from "./UserProfilePopup.tsx";

export function UserProfileButton() {
  const { user } = useUserStore();

  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    void updateUserStore();
  }, []);

  if (!user) {
    return;
  }

  return (
    <>
      <div
        className="relative cursor-pointer z-10 group"
        onClick={() => {
          setShowPopup(true);
        }}
      >
        <Avatar src={user.avatar} className="size-14" />
        {/*<div className="size-16 absolute bg-button-primary-hover transform rotate-180 -z-10 -top-1 -left-1 group-hover:opacity-0 group-hover:scale-75 transition-all duration-300 ease-out"></div>*/}
        {/*<div className="h-16 w-0 absolute bg-button-primary -z-10 -top-1 -left-1 group-hover:w-16 transition-all duration-300 ease-in"></div>*/}
        {/*<div className="size-16 absolute -top-1 -left-1 bg-gradient-to-r from-button-primary to-button-primary-hover blur-sm animate-gradient group-hover:gradient-glow -z-10 transition-all" />*/}
        <div className="size-16 absolute -top-1 -left-1 animated-gradient opacity-30 group-hover:opacity-100 group-hover:animate-gradient transition-all duration-500 ease-out -z-10"></div>
      </div>
      {showPopup && (
        <UserProfilePopup
          user={user}
          onClose={() => {
            setShowPopup(false);
          }}
        />
      )}
    </>
  );
}
