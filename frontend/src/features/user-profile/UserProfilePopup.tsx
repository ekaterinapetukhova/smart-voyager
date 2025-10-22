import { Popup } from "../../components/common/Popup.tsx";
import { useTokenStore } from "../../store/user-store.ts";
import { User } from "../../types/user.types.ts";
import { Avatar } from "../../components/common/Avatar.tsx";

interface UserProfilePopupProps {
  user: User;
  onClose: () => void;
}

export function UserProfilePopup(props: UserProfilePopupProps) {
  const logout = useTokenStore((s) => s.logout);

  return (
    <Popup
      title={`${props.user.name}'s profile`}
      closePopup={props.onClose}
      containerClassName="bg-background border border-button-primary border-2 w-1/2 h-3/5"
    >
      <h2 className="text-3xl font-bold text-text mb-4">{props.user.name}</h2>
      <div className="flex">
        <Avatar src={props.user.avatar} className="size-60" />
        <div className="text-text"></div>
      </div>
    </Popup>
  );
}
