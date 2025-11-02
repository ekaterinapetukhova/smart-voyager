import UserAvatar from "/user-avatar.jpg";

interface AvatarProps {
  src?: string;
  className?: string;
}

export function Avatar(props: AvatarProps) {
  return (
    <div className={props.className}>
      <img
        className="w-full h-full object-cover"
        src={props.src ? `data:image/jpeg;base64,${props.src}` : UserAvatar}
        alt="User Avatar"
      />
    </div>
  );
}
