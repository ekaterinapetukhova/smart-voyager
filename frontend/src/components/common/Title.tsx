import * as React from "react";

interface TitleProps {
  children: React.ReactNode;
  classNames?: string;
}

export function Title(props: TitleProps) {
  return <h1 className={["text-5xl text-text", props.classNames ?? ""].join(" ")}>{props.children}</h1>;
}
