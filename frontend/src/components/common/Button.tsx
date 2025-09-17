interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  icon?: string;
  onClick?: () => void;
  size: "large" | "medium";
}

export const Button = (props: ButtonProps) => {
  const sizeStyles = {
    fontSize: {
      medium: "text-sm",
      large: "text-xl",
    },
  };

  return (
    <button
      type={props.type ?? "button"}
      className="cursor-pointer relative overflow-hidden group bg-button-primary w-full py-3 px-4 flex items-center justify-center"
      onClick={(e) => {
        e.stopPropagation();

        if (props.onClick) {
          props.onClick();
        }
      }}
    >
      <span className={["font-bold text-text z-10", sizeStyles.fontSize[props.size]].join(" ")}>{props.label}</span>
      <span className="absolute top-0 -left-2 w-0 h-full bg-button-primary-hover transform -skew-x-12 group-hover:w-[60%] transition-all duration-500 ease-out" />
      <span className="absolute top-0 -right-2 w-0 h-full bg-button-primary-hover transform -skew-x-12 group-hover:w-[60%] transition-all duration-500 ease-out" />
    </button>
  );
};
