import { Link } from "react-router-dom";
import { ReactNode } from "react";

interface LinkToProps {
  label?: string;
  url: string;
  isActive?: boolean;
  icon?: ReactNode;
}

export function LinkTo(props: LinkToProps) {
  return (
    <Link className="relative group flex items-center justify-center w-fit" to={props.url}>
      <span
        className={[
          "font-bold z-10 text-md md:text-xl text-button-primary group-hover:text-button-primary-hover transition-all duration-300 pb-2",
          props.isActive ? "text-button-primary-hover" : "text-text",
        ].join(" ")}
      >
        {props.icon}
        {props.label}
      </span>
      {props.isActive && <span className="absolute bottom-1 hidden md:block bg-button-primary-hover h-0.5 w-full" />}
      <span
        className={`absolute bottom-1 block w-0 transform translate-x-[49%] bg-button-primary-hover h-0.5 group-hover:w-1/2 transition-all duration-300 ease-out`}
      />
      <span
        className={`absolute bottom-1 block w-0 transform -translate-x-[49%] bg-button-primary-hover h-0.5 group-hover:w-1/2 transition-all duration-300 ease-out`}
      />
    </Link>
  );
}
