import { Popup } from "../../components/common/Popup.tsx";
import { useTokenStore, useUserStore } from "../../store/user-store.ts";
import { User } from "../../types/user.types.ts";
import { Avatar } from "../../components/common/Avatar.tsx";
import { ButtonLink } from "../../components/common/ButtonLink.tsx";

interface UserProfilePopupProps {
  user: User;
  onClose: () => void;
}

export function UserProfilePopup(props: UserProfilePopupProps) {
  const { logout } = useTokenStore();
  const { user } = useUserStore();

  if (!user) {
    return;
  }

  // const formatDate;

  const userInfoItems = Object.entries(user)
    .filter(([k, v]) => k !== "avatar" && k !== "id" && k !== "name" && v)
    .map(([k, v]) => {
      const label = k === "birthDate" ? "Birth date" : k;

      return (
        <li className="flex flex-col gap-y-2">
          <span className="text-accent font-bold text-xl">{label[0].toUpperCase() + label.slice(1)}</span>
          <span className="text-text">{v}</span>
        </li>
      );
    });

  return (
    <Popup closePopup={props.onClose} containerClassName="w-2/3 h-4/5">
      <div className="px-4 py-2">
        <h2 className="text-3xl font-bold text-text mb-4">{props.user.name}</h2>
        <div className="flex">
          <Avatar src={props.user.avatar} className="size-60" />
          <ul className="">{userInfoItems}</ul>
        </div>
        <div className="w-xs mx-auto">
          <ButtonLink
            label="Log out"
            size="medium"
            componentVariants={{
              button: {
                selected: true,
                onClick: () => {
                  logout();
                },
              },
            }}
          />
        </div>
      </div>
    </Popup>
  );
}
