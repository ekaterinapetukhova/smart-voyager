import { ReactNode, useEffect, useRef } from "react";

interface PopupProps {
  title: string;
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
    <div className="inset-0 fixed bg-black/80 z-10 size-full flex justify-center items-center">
      <div className={["w-fit fit px-5 py-2 relative popup", props.containerClassName ?? ""].join(" ")} ref={popupRef}>
        <div className="flex flex-col items-center gap-y-4">
          <span className="text-xl font-bold">{props.title}</span>
          {props.children}
        </div>
        <span className="text-text cursor-pointer absolute top-2 right-2" onClick={props.closePopup}>
          X
        </span>
      </div>
    </div>
  );
}
