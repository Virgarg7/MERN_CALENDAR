import React from "react";

export const Day = ({ day, onClick }) => {
    const className = `day ${day.padding === true ? "padding" : ""} ${day.isToday ? "today" : ""} ${day.isCurrentDay ? "currentDay" : ""}`;
    return (
        <div onClick={onClick} className={className}>
            {day.value}
            {day.eventSchedule && <div className="event">Classes</div>}
            {day.eventExam && <div className="event">Exams</div>}
            {day.eventAssignment && <div className="event">Assignments</div>}
        </div>
    );
};