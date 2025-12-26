import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

interface ButtonLinkProps {
  size: "large" | "medium" | "small";
  label: string;
  componentVariants: {
    button?: {
      selected: boolean;
      isLoading?: boolean;
      type?: "button" | "submit" | "reset";
      onClick?: () => void | Promise<void>;
    };
    link?: {
      selected: boolean;
      url: string;
    };
  };
}

export function ButtonLink(props: ButtonLinkProps) {
  const [loadingProgress, setLoadingProgress] = useState(0);

  const button = props.componentVariants.button;
  const link = props.componentVariants.link;

  useEffect(() => {
    let timer: ReturnType<typeof setInterval> | null = null;

    if (button?.isLoading) {
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
  }, [button?.isLoading]);

  const sizeStyles = {
    fontSize: {
      small: "text-xs",
      medium: "text-sm",
      large: "text-md xl:text-xl",
    },
    p: {
      small: "p-0.5",
      medium: "p-1",
      large: "p-0.5 xl:p-1.5",
    },
  };

  const componentClassNames =
    "cursor-pointer relative overflow-hidden h-full bg-button-primary group w-full py-3 px-4 flex items-center justify-center";

  const labelClassNames = [
    "text-center font-bold text-text z-10",
    sizeStyles.fontSize[props.size],
    sizeStyles.p[props.size],
  ].join(" ");

  const buttonSpanCommonClassNames =
    "absolute top-0 w-0 h-full bg-button-primary-hover transform -skew-x-12 group-hover:w-[60%] transition-all duration-300 ease-out";

  return (
    <>
      {/* Button */}
      {button?.selected && (
        <button
          type={button.type ?? "button"}
          className={componentClassNames}
          onClick={(e) => {
            e.stopPropagation();

            if (button.onClick && !button.isLoading) {
              void button.onClick();
            }
          }}
        >
          {button.isLoading ? (
            <>
              <div
                className="absolute top-0 left-0 bg-button-primary-hover bottom-0 transition-all"
                style={{
                  width: `${Math.round(loadingProgress)}%`,
                }}
              ></div>
              <span className="z-10 text-text font-semibold"> Thinking...</span>
            </>
          ) : (
            <>
              <span className={labelClassNames}>{props.label}</span>
              <span className={`${buttonSpanCommonClassNames} -left-2`} />
              <span className={`${buttonSpanCommonClassNames} -right-2`} />
            </>
          )}
        </button>
      )}

      {/* Link */}
      {link?.selected && (
        <Link className={componentClassNames} to={link.url}>
          <span className={labelClassNames}>{props.label}</span>
          <span className={`${buttonSpanCommonClassNames} -left-2`} />
          <span className={`${buttonSpanCommonClassNames} -right-2`} />
        </Link>
      )}
    </>
  );
}
