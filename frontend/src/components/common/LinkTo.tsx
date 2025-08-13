interface LinkToProps {
  label: string;
  url: string;
  img?: boolean;
  src?: string;
  imgClassNames?: string;
}

export const LinkTo = (props: LinkToProps) => {
  return (
    <a className="" href={props.url}>
      {props.img ? <img className={props.imgClassNames} src={props.src} alt={props.label} /> : props.label}
    </a>
  );
};
