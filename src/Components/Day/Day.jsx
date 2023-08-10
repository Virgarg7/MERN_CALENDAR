import React from "react";

export const Day = ({ day, onClick }) => {
    const className = `day ${day.padding === true ? "padding" : ""} ${day.isToday ? "today" : ""} ${day.isCurrentDay ? "currentDay" : ""} {day.isWeekend ? "isWeekend" : ""}`;
    return (
        <div onClick={onClick} className={className}>
            {day.value}
            {day.eventSchedule && <div className="eventSchedule">Classes</div>}
            {day.eventExam && <div className="eventExam">Exams</div>}
            {day.eventAssignment && <div className="eventAssignment">Assignments</div>}
        </div>
    );
};