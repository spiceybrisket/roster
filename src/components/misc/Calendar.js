import React, { useState, useEffect } from "react";
import { useStore } from "../../store/useStore";
import { format, getMonth, subMonths, addMonths } from "date-fns";
import { Icon } from "semantic-ui-react";
import { A } from "hookrouter";
import uuid from "uuid";
import api from "../../store/api";

import ActivityCard from "../cards/ActivityCard";
import "../styles/calender-styles.css";

const useFetch = data => {
  const [activities, setActivities] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await api.activities.fectUserActivities(data);
      console.log(res);
      const responseData = await res.data;
      setActivities(responseData);
      setLoading(false);
    })();
  }, [data]);

  return { activities, loading };
};

const Calendar = () => {
  const { state, dispatch } = useStore();
  const [data, setData] = useState({
    selectedDate: format(new Date(), "YYYY-MM-DD"),
    userId: state.user.companyStaffId
  });

  const { activities, loading } = useFetch(data);

  const minusMonth = () => {
    const newDate = format(subMonths(data.selectedDate, 1), "YYYY-MM-DD");
    const newData = {
      selectedDate: newDate,
      userId: state.user.companyStaffId
    };
    setData(newData);
  };

  const plusMonth = () => {
    const newDate = format(addMonths(data.selectedDate, 1), "YYYY-MM-DD");

    const newData = {
      selectedDate: newDate,
      userId: state.user.companyStaffId
    };

    setData(newData);
  };

  const renderCalendar = () => {
    return (
      <div className="calendar-container">
        <div className="calendar-header">
          <Icon name="angle double left" size="big" onClick={minusMonth} />
          {format(data.selectedDate, "MMM YYYY")}
          <Icon name="angle double right" size="big" onClick={plusMonth} />
        </div>
        <div className="calendar">
          <span className="day-name">Mon</span>
          <span className="day-name">Tue</span>
          <span className="day-name">Wed</span>
          <span className="day-name">Thu</span>
          <span className="day-name">Fri</span>
          <span className="day-name">Sat</span>
          <span className="day-name">Sun</span>
          {activities.map(day => {
            return (
              <div
                key={uuid.v4()}
                className={
                  getMonth(day.date) !== getMonth(data.selectedDate)
                    ? "day day--disabled"
                    : "day"
                }
              >
                {format(day.date, "DD")}
                {day.activities.map(activity => {
                  return (
                    <A
                      key={uuid.v4()}
                      href={`/activities/edit/${activity.id}`}
                      style={{ pointerEvents: "auto" }}
                    >
                      <ActivityCard
                        key={uuid.v4()}
                        date={activity.date}
                        name={activity.name}
                        background={activity.colour}
                        shortName={activity.short_name}
                        truck={activity.truck}
                      />
                    </A>
                  );
                })}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <React.Fragment>
      {Array.isArray(activities) ? (
        renderCalendar()
      ) : (
        <p>No Activities Found</p>
      )}
    </React.Fragment>
  );
};

export default Calendar;
