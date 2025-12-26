import { useEffect, useState } from "react";

export interface ButtonProps {
  label: string;
  type?: "button" | "submit" | "reset";
  icon?: string;
  onClick?: () => void | Promise<void>;
  size: "large" | "medium" | "small";
  isLoading?: boolean;
  disabled?: boolean;
}

export function Button(props: ButtonProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    if (props.isLoading) {
      setLoadingProgress(0);

      timer = setInterval(() => {
        setLoadingProgress((prev) => {
          const loadingSpeed = 0.01;

          return prev * (1.0 - loadingSpeed) + 100 * loadingSpeed;
        });
      }, 500);
    }

    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [props.isLoading]);

  const sizeStyles = {
    fontSize: {
      small: "text-xs",
      medium: "text-xs md:text-sm",
      large: "text-md xl:text-xl",
    },
    p: {
      small: "p-0.5",
      medium: "p-0.5 md:p-1",
      large: "p-0.5 xl:p-5",
    },
  };

  return (
    <button
      disabled={props.disabled}
      type={props.type ?? "button"}
      className={[
        "cursor-pointer relative overflow-hidden h-13 bg-button-primary group w-full flex items-center justify-center",
        props.disabled && "grayscale pointer-events-none",
      ].join(" ")}
      onClick={(e) => {
        e.stopPropagation();

        if (props.onClick && !props.isLoading) {
          void props.onClick();
        }
      }}
    >
      {props.isLoading ? (
        <>
          <div
            className="absolute top-0 left-0 bg-button-primary-hover bottom-0 transition-all"
            style={{
              width: `${Math.round(loadingProgress)}%`,
            }}
          ></div>
          <span
            className={["z-10 text-text font-bold", sizeStyles.fontSize[props.size], sizeStyles.p[props.size]].join(
              " "
            )}
          >
            Thinking...
          </span>
        </>
      ) : (
        <>
          <span
            className={["font-bold text-text z-10", sizeStyles.fontSize[props.size], sizeStyles.p[props.size]].join(
              " "
            )}
          >
            {props.label}
          </span>
          <span className="absolute top-0 -left-2 w-0 h-full bg-button-primary-hover transform -skew-x-12 group-hover:w-[60%] transition-all duration-500 ease-out" />
          <span className="absolute top-0 -right-2 w-0 h-full bg-button-primary-hover transform -skew-x-12 group-hover:w-[60%] transition-all duration-500 ease-out" />
        </>
      )}
    </button>
  );
}
