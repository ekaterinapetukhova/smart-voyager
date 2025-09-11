import * as React from "react";

interface TitleProps {
  children: React.ReactNode;
}

export function Title(props: TitleProps) {
  return <h1 className="text-5xl text-text w-1/3">{props.children}</h1>;
}
