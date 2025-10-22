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
      <div className={["p-5 relative popup", props.containerClassName ?? ""].join(" ")} ref={popupRef}>
        {props.children}
        <span className="text-text cursor-pointer absolute top-2 right-2" onClick={props.closePopup}>
          X
        </span>
      </div>
    </div>
  );
}
