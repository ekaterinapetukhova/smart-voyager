import { ReactNode } from "react";
import Bg from "/bg.svg";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowBackIcon } from "../icon/ArrowBackIcon.tsx";
import { RouterEnum } from "../../types/router.types.ts";

interface BackgroundProps {
  children: ReactNode;
  childrenContainerClassNames?: string;
}

export function Container(props: BackgroundProps) {
  const navigate = useNavigate();
  const location = useLocation();

  const pathname = location.pathname as RouterEnum;

  const excludedPathNames = [
    RouterEnum.Auth,
    RouterEnum.PlannedTrips,
    RouterEnum.DraftTrips,
    RouterEnum.TripMates,
    RouterEnum.Chats,
  ];

  return (
    <div className="relative px-5 size-full overflow-y-auto">
      <img
        className="fixed scale-110 left-0 top-o size-full -z-10 opacity-10 contrast-50 object-cover print:hidden"
        src={Bg}
        alt="Background"
      />
      <div className={props.childrenContainerClassNames ?? ""}>{props.children}</div>
      {!(excludedPathNames.includes(pathname) || pathname.includes("/trip/")) && (
        <div className="absolute top-1/2 left-10 group">
          <div
            className="size-12 flex items-center justify-center group-hover:bg-button-primary transition rounded-full cursor-pointer"
            onClick={() => void navigate(-1)}
          >
            <ArrowBackIcon className="size-8 group-hover:fill-accent" />
          </div>
        </div>
      )}
    </div>
  );
}
