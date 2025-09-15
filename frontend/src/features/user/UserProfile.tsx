import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { RouterEnum } from "../../types/router.types.ts";
import { updateUserStore, useUserStore } from "../../store/user-store.ts";
import { Avatar } from "../../components/common/Avatar.tsx";

export function UserProfile() {
  const { user } = useUserStore();

  const navigate = useNavigate();

  useEffect(() => {
    void updateUserStore();
  }, []);

  return (
    <div
      className="cursor-pointer shadow-[1px_1px_100px_rgba(255,9,238,0.4)] size-10"
      onClick={() => {
        void navigate(RouterEnum.UserSettings);
      }}
    >
      <Avatar src={user?.avatar} className="size-10" />
    </div>
  );
}
