import { Link } from "react-router-dom";

interface LinkToProps {
  label: string;
  url: string;
  type: "button" | "link";
  imgSrc?: string;
  imgClassNames?: string;
  isActive?: boolean;
}

export function LinkTo(props: LinkToProps) {
  const buttonSpanCommonClassNames =
    "absolute top-0 w-0 h-full bg-button-primary-hover transform -skew-x-12 group-hover:w-[60%] transition-all duration-300 ease-out";

  return (
    <Link
      className={[
        "relative group flex items-center justify-center",
        props.type === "button" ? "py-3 w-full bg-button-primary overflow-hidden" : "w-fit",
      ].join(" ")}
      to={props.url}
    >
      <span
        className={[
          "font-bold z-10 text-xl",
          props.type === "button"
            ? "text-text"
            : "text-button-primary group-hover:text-button-primary-hover transition-all duration-300 pb-2",
          props.isActive ? "text-button-primary-hover" : "text-text",
        ].join(" ")}
      >
        {props.label}
      </span>
      {props.type === "button" && (
        <>
          <span className={`${buttonSpanCommonClassNames} -left-2`} />
          <span className={`${buttonSpanCommonClassNames} -right-2`} />
        </>
      )}
      {props.type === "link" && (
        <>
          {props.isActive && <span className={`absolute bottom-1 block bg-button-primary-hover h-0.5 w-full`} />}
          <span
            className={`absolute bottom-1 block w-0 transform translate-x-[49%] bg-button-primary-hover h-0.5 group-hover:w-1/2 transition-all duration-300 ease-out`}
          />
          <span
            className={`absolute bottom-1 block w-0 transform -translate-x-[49%] bg-button-primary-hover h-0.5 group-hover:w-1/2 transition-all duration-300 ease-out`}
          />
        </>
      )}
      {/*{props.imgSrc && }*/}
    </Link>
  );
}
