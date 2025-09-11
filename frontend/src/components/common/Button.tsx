interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  icon?: string;
  onClick?: () => void;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      type={props.type ?? "button"}
      className="cursor-pointer relative overflow-hidden group bg-button-primary w-full py-3 flex items-center justify-center"
      onClick={props.onClick}
    >
      <span className="font-bold text-text z-10 text-xl">{props.label}</span>
      <span className="absolute top-0 -left-2 w-0 h-full bg-button-primary-hover transform -skew-x-12 group-hover:w-[60%] transition-all duration-500 ease-out" />
      <span className="absolute top-0 -right-2 w-0 h-full bg-button-primary-hover transform -skew-x-12 group-hover:w-[60%] transition-all duration-500 ease-out" />
    </button>
  );
};
