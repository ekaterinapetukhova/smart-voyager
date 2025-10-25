import { ReactNode, useEffect, useRef } from "react";

interface PopupProps {
  children: ReactNode;
  closePopup: () => void;
  containerClassName?: string;
}

export function Popup(props: PopupProps) {
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        props.closePopup();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("click", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [props, props.closePopup]);

  return (
    <div className="inset-0 fixed bg-black/80 z-100 size-full flex justify-center items-center">
      <div
        className={["relative z-10 overflow-hidden bg-background p-1", props.containerClassName ?? ""].join(" ")}
        ref={popupRef}
      >
        <div className="animate-neon-gradient bg-[200%,_200%] absolute inset-0 h-full w-full bg-linear-to-r from-button-primary via-accent to-button-primary-hover"></div>
        <div className="relative z-20 bg-background h-full flex flex-col">{props.children}</div>
        <span className="text-text z-20 cursor-pointer absolute top-2 right-2" onClick={props.closePopup}>
          X
        </span>
      </div>
    </div>
  );
}
