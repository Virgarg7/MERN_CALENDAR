import React from "react";

export const Day = ({ day, onClick }) => {
    const className = `day ${day.padding === true ? "padding" : ""} ${day.isToday ? "today" : ""} ${day.isCurrentDay ? "currentDay" : ""}`;
    return (
        <div onClick={onClick} className={className}>
            {day.value}
            {day.event && <div className="event">{day.event.title}</div>}
        </div>
    );
};