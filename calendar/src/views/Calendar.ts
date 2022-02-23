import { Div } from '../../../ui/components';
import { Weekday } from './Weekday';

export function Calendar() {
  const calendar = Div({
    styles: {
      display: "flex",
      justifyContent: "space-between",
    },
  });

  const hourContainer = Div({
    styles: {
      borderRight: "#dadce0 1px solid",
      boxSizing: "content-box"
    }
  });
  hourContainer.append(Div({
    styles: {
      height: "36px",
    }
  }))
  for (let i = 0; i < 24; i++) {
    const hourText = Div({
      innerText: String(i),
      styles: {
        display: "flex",
        alignItems: "center",
        height: "40px",
        borderBottom: "#dadce0 1px solid",
        boxSizing: "border-box",
        paddingRight: "8px",
      }
    });
    hourContainer.append(hourText);
  }
  calendar.append(hourContainer);

  for (let i = 0; i < 7; i++) {
    const weekday = Weekday({
      index: i,
      day: 20 + i,
    });
    calendar.append(weekday);
  }

  return calendar;
}
