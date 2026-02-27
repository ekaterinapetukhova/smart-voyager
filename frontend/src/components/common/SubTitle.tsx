interface SubTitleProps {
  content: string;
}

export function SubTitle(props: SubTitleProps) {
  return <h3 className="text-accent font-semibold text-md md:text-lg">{props.content}</h3>;
}
