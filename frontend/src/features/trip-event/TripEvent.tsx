interface EventProps {
  from: string;
  to: string;
}

export function TripEvent(props: EventProps) {
  const formattedFrom = new Date(props.from).toLocaleString().split(",")[0];
  const formattedTo = new Date(props.to).toLocaleString().split(",")[0];

  const commonLabelsClasses = "text-accent",
    commonDatesClasses = "text-text",
    commonBlockClasses = "flex flex-col gap-y-2";

  return (
    <div className="flex gap-x-10">
      <div className={commonBlockClasses}>
        <span className={commonLabelsClasses}>Trip start</span>
        <span className={commonDatesClasses}>{formattedFrom}</span>
      </div>
      <div className={commonBlockClasses}>
        <span className={commonLabelsClasses}>Trip end</span>
        <span className={commonDatesClasses}>{formattedTo}</span>
      </div>
    </div>
  );
}
