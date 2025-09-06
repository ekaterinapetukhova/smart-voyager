import UserAvatar from "/user-avatar.jpg";

interface AvatarProps {
  src?: string | null;
  className?: string;
}

export function Avatar(props: AvatarProps) {
  return (
    <div className={["overflow-hidden", props.className ?? ""].join(" ")}>
      <img
        className="w-full h-full object-cover scale-120"
        src={props.src ? `data:image/jpeg;base64,${props.src}` : UserAvatar}
        alt="User Avatar"
      />
    </div>
  );
}
