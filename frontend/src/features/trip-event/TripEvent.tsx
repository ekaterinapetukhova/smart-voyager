import { formatDate } from "../../utils/formatDate.ts";

interface EventProps {
  from: string;
  to: string;
}

export function TripEvent(props: EventProps) {
  const { from, to } = formatDate(props.from, props.to);

  const commonLabelsClasses = "text-accent",
    commonDatesClasses = "text-text",
    commonBlockClasses = "flex flex-col gap-y-2";

  return (
    <div className="flex gap-x-10">
      <div className={commonBlockClasses}>
        <span className={commonLabelsClasses}>Trip start</span>
        <span className={commonDatesClasses}>{from}</span>
      </div>
      <div className={commonBlockClasses}>
        <span className={commonLabelsClasses}>Trip end</span>
        <span className={commonDatesClasses}>{to}</span>
      </div>
    </div>
  );
}
