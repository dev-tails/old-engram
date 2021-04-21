import './DateHeader.scss';

import { IconButton, Select } from '@material-ui/core';
import { ChevronLeft, ChevronRight, Sync as SyncIcon } from '@material-ui/icons';
import { DatePicker } from '@material-ui/pickers';
import { MaterialUiPickersDate } from '@material-ui/pickers/typings/date';
import moment, { DurationInputArg2 } from 'moment';
import React, { useEffect } from 'react';

export type DateHeaderProps = {
  dateRangeValue: string;
  syncing?: boolean;
  date?: Date;
  onDateChange: (date: Date) => void;
  onDateRangeChange?: (dateRange: string) => void;
  onSyncClicked?: () => void;
};

export const DateHeader: React.FC<DateHeaderProps> = ({
  date,
  syncing,
  dateRangeValue,
  onDateChange,
  onDateRangeChange,
  onSyncClicked,
}) => {
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

  const handleDateChanged = (date: MaterialUiPickersDate) => {
    onDateChange(date as Date);
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

  const handleDateRangeChanged = (newValue: string) => {
    if (onDateRangeChange) {
      onDateRangeChange(newValue);
    }
  };

  return (
    <div className="date-header">
      {onDateRangeChange ? (
        <>
          <Select
            className="date-range-button"
            native
            value={dateRangeValue}
            onChange={(e) => {
              handleDateRangeChanged(e.target.value as string);
            }}
            disableUnderline={true}
          >
            {["Day", "Week", "Fortnight", "Month", "Quarter", "Year"].map(
              (option) => {
                return (
                  <option
                    key={option}
                    value={option}
                    title={`Alt + ${option[0]}`}
                  >
                    {option}
                  </option>
                );
              }
            )}
          </Select>
        </>
      ) : null}

      <div className="date">
        <IconButton
          color="inherit"
          onClick={handleNavigateDate.bind(this, "left")}
          title="Alt+LeftArrow"
          edge="end"
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

        <IconButton
          color="inherit"
          onClick={handleNavigateDate.bind(this, "right")}
          title="Alt+RightArrow"
          edge="start"
        >
          <ChevronRight />
        </IconButton>

        {onSyncClicked ? (
          <IconButton
            className={`sync-icon ${syncing ? "syncing" : ""}`}
            aria-label="sync"
            onClick={onSyncClicked}
          >
            <SyncIcon />
          </IconButton>
        ) : null}
      </div>
    </div>
  );
};
