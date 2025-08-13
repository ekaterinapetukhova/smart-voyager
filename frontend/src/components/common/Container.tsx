import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = (props: ContainerProps) => {
  return <div className={["max-w-[92rem] mx-auto px-4", props.className ?? ""].join(" ")}>{props.children}</div>;
};
