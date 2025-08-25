import { ReactNode, useEffect, useRef } from "react";
import { Button } from "./Button.tsx";

interface PopupProps {
  title: string;
  children: ReactNode;
  closePopup: () => void;
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
    <div className="inset-0 fixed bg-black/50 z-10 size-full flex justify-center items-center">
      <div className="bg-white w-fit fit px-5 py-2 relative popup" ref={popupRef}>
        <div className="flex flex-col items-center gap-y-4">
          <span className="text-xl font-bold">{props.title}</span>
          {props.children}
        </div>
        <Button classNames="absolute top-0 right-0" label="X" onClick={props.closePopup} />
      </div>
    </div>
  );
}
