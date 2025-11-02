interface SubTitleProps {
  content: string;
}

export function SubTitle(props: SubTitleProps) {
  return <h3 className="text-accent font-semibold text-xl">{props.content}</h3>;
}
