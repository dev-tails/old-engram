import "./DailyHeader.scss";

import { IconButton } from "@material-ui/core";
import {
  ChevronLeft,
  ChevronRight,
  WifiOff,
  Refresh,
  Today,
} from "@material-ui/icons";
import { DatePicker } from "@material-ui/pickers";
import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { setDate } from "../../redux/actions/DateActions";

type DailyHeaderProps = {};

export const DailyHeader: React.FC<DailyHeaderProps> = (props) => {
  const dispatch = useDispatch();
  const { date, user } = useSelector((state: any) => {
    return {
      user: state.user,
      date: state.date,
    };
  });

  function handleDateChanged(date: Date | null) {
    if (date) {
      setDate(dispatch, date);
    }
  }

  const handleNavigateDate = (direction: "left" | "right") => {
    let amount = direction === "right" ? 1 : -1;

    handleDateChanged(moment(date).add(amount, "d").startOf("d").toDate());
  };

  return (
    <div className="daily-header">
      <IconButton
        className="today"
        onClick={() => {
          handleDateChanged(new Date());
        }}
      >
        <Today />
      </IconButton>

      <div className="spacer" />

      <IconButton
        onClick={handleNavigateDate.bind(this, "left")}
        title="Alt+LeftArrow"
      >
        <ChevronLeft />
      </IconButton>

      <DatePicker
        className="date-picker"
        format="yyyy-MM-dd"
        autoOk={true}
        value={date}
        onChange={handleDateChanged}
        showTodayButton={true}
        InputProps={{ disableUnderline: true }}
      />

      <IconButton onClick={handleNavigateDate.bind(this, "right")}>
        <ChevronRight />
      </IconButton>

      <div className="spacer" />

      {!user ? (
        <IconButton className="refresh" onClick={() => {}} disabled>
          <WifiOff />
        </IconButton>
      ) : (
        <IconButton
          className="refresh"
          onClick={() => {
            handleDateChanged(moment(date).toDate());
          }}
        >
          <Refresh />
        </IconButton>
      )}
    </div>
  );
};
