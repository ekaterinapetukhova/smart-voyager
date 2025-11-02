import * as React from "react";

interface TripBlockWrapperProps {
  children: React.ReactNode;
}

export function TripBlockWrapper(props: TripBlockWrapperProps) {
  return <div className="flex flex-col gap-y-4">{props.children}</div>;
}
