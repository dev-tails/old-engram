import { Div } from '../../../ui/components/Div';

type WeekdayProps = {
  index: number;
  day: number;
};

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export function Weekday(props: WeekdayProps) {
  const el = Div({
    styles: {
      // margin: "0 auto",
      textAlign: "center",
      flexGrow: "1",
    },
  });

  const dayOfWeekText = Div({
    innerText: daysOfWeek[props.index],
  });
  el.append(dayOfWeekText);

  const dayText = Div({
    innerText: String(props.day),
  });
  el.append(dayText);

  for (let i = 0; i < 24; i++) {
    const hourBlock = Div({
      styles: {
        height: "40px",
        borderRight: "#dadce0 1px solid",
        borderBottom: "#dadce0 1px solid",
        boxSizing: "border-box"
      }
    });
    el.append(hourBlock)
  }

  return el;
}
