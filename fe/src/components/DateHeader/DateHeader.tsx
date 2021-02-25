import { IconButton, Menu, MenuItem, TextField } from "@material-ui/core";
import { ChevronLeft, ChevronRight } from "@material-ui/icons";
import moment, { DurationInputArg2 } from "moment";
import React, { ChangeEvent, useEffect, useState } from "react";
import "./DateHeader.scss";

export type DateHeaderProps = {
  dateRangeValue: string;
  date?: Date;
  onDateChange: (date: Date) => void;
  onDateRangeChange: (dateRange: string) => void;
};

export const DateHeader: React.FC<DateHeaderProps> = ({
  date,
  dateRangeValue,
  onDateChange,
  onDateRangeChange,
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [dateString, setDateString] = useState(
    moment(date).format("YYYY-MM-DD")
  );

  useEffect(() => {
    function keyDownListener(event: KeyboardEvent) {
      if (!event.altKey) {
        return;
      }

      if (event.key === "t") {
        event.preventDefault();
        onDateChange(new Date());
      }

      let dateRangeMap: { [key: string]: string } = {
        d: "Day",
        w: "Week",
        f: "Fortnight",
        m: "Month",
        q: "Quarter",
        y: "Year",
      };
      const dateRange = dateRangeMap[event.key];
      if (dateRange) {
        event.preventDefault();
        handleDateRangeChanged(dateRange);
      }

      if (event.key === "ArrowLeft") {
        handleNavigateDate("left");
        event.preventDefault();
      } else if (event.key === "ArrowRight") {
        handleNavigateDate("right");
        event.preventDefault();
      }
    }
    document.addEventListener("keydown", keyDownListener);

    return () => {
      document.removeEventListener("keydown", keyDownListener);
    };
  });

  const handleDateChanged = (event: ChangeEvent<HTMLInputElement>) => {
    setDateString(event.currentTarget.value);
  };

  const handleDateBlur = () => {
    if (onDateChange) {
      const dateAsMoment = moment(dateString);
      if (dateAsMoment.isValid()) {
        onDateChange(dateAsMoment.startOf("d").toDate());
      }
    }
  };

  const handleNavigateDate = (direction: "left" | "right") => {
    const unitMap: { [key: string]: DurationInputArg2 } = {
      Day: "day",
      Week: "week",
      Fortnight: "week",
      Month: "month",
      Quarter: "quarter",
      Year: "year",
    };
    const unit = unitMap[dateRangeValue];
    let amount = dateRangeValue === "Fortnight" ? 2 : 1;

    if (direction === "left") {
      onDateChange(moment(date).add(-amount, unit).startOf(unit).toDate());
    } else if (direction === "right") {
      onDateChange(moment(date).add(amount, unit).startOf(unit).toDate());
    }
  };

  const handleDateRangeClicked = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseDateRangeMenu = () => {
    setAnchorEl(null);
  };

  const handleDateRangeChanged = (newValue: string) => {
    onDateRangeChange(newValue);
    handleCloseDateRangeMenu();
  };

  return (
    <div className="date-header">
      <>
        <IconButton
          id="date-range-button"
          aria-controls="date-range-menu"
          aria-haspopup="true"
          edge="start"
          color="inherit"
          size="small"
          onClick={handleDateRangeClicked}
        >
          {dateRangeValue[0]}
        </IconButton>
        <Menu
          id="date-range-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleCloseDateRangeMenu}
        >
          {["Day", "Week", "Fortnight", "Month", "Quarter", "Year"].map(
            (option) => {
              return (
                <MenuItem
                  key={option}
                  value={option}
                  onClick={handleDateRangeChanged.bind(this, option)}
                  title={`Alt + ${option[0]}`}
                >
                  {option}
                </MenuItem>
              );
            }
          )}
        </Menu>
      </>

      <IconButton
        color="inherit"
        onClick={handleNavigateDate.bind(this, "left")}
        title="Alt+LeftArrow"
        size="small"
      >
        <ChevronLeft />
      </IconButton>

      <TextField
        id="date"
        type="date"
        required
        value={dateString}
        onChange={handleDateChanged}
        onBlur={handleDateBlur}
        InputProps={{
          disableUnderline: true,
        }}
      />

      <IconButton
        color="inherit"
        onClick={handleNavigateDate.bind(this, "right")}
        title="Alt+RightArrow"
        size="small"
      >
        <ChevronRight />
      </IconButton>
    </div>
  );
};
