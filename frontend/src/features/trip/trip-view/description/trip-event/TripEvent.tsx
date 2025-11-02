import { formatDate } from "../../../../../utils/format-date.ts";
import { SubTitle } from "../../../../../components/common/SubTitle.tsx";
import { TripBlockWrapper } from "../TripBlockWrapper.tsx";

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
    <TripBlockWrapper>
      <SubTitle content="Trip Period" />
      <div className="flex gap-x-10">
        <div className={commonBlockClasses}>
          <span className={commonLabelsClasses}>Start</span>
          <span className={commonDatesClasses}>{from}</span>
        </div>
        <div className={commonBlockClasses}>
          <span className={commonLabelsClasses}>End</span>
          <span className={commonDatesClasses}>{to}</span>
        </div>
      </div>
    </TripBlockWrapper>
  );
}
