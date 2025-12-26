import * as React from "react";

interface TextareaProps {
  value: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export function Textarea(props: TextareaProps) {
  return (
    <textarea
      className="h-20 resize-none outline-0 text-sm border-b-2 pb-1 text-text w-fit field-sizing-content min-w-lg"
      onChange={props.onChange}
      value={props.value}
    />
  );
}
