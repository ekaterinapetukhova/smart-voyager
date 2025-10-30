interface SubTitleProps {
  content: string;
}

export function SubTitle(props: SubTitleProps) {
  return <h3 className="text-accent font-boldt text-xl mb-4">{props.content}</h3>;
}
