import { ReactNode } from "react";
import Bg from "/bg.svg";

interface BackgroundProps {
  children: ReactNode;
  childrenContainerClassNames?: string;
  withBg?: boolean;
}

export function Container(props: BackgroundProps) {
  return (
    <div className={["relative px-5 w-full", !props.withBg ? "bg-background" : ""].join(" ")}>
      {props.withBg && (
        <img
          className="absolute scale-110 left-0 top-o size-full -z-10 opacity-10 contrast-50 object-cover"
          src={Bg}
          alt="Background"
        />
      )}
      <div className={["flex items-center h-full", props.childrenContainerClassNames ?? ""].join(" ")}>
        {props.children}
      </div>
    </div>
  );
}
