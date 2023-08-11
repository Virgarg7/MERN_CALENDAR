import React from "react";

export const Schedule = ({ schedule, onClick }) => {
    const scheduleName = `schedule ${schedule.isCompleted === true ? "isCompleted" : ""}`;
    return (
        <div onClick={onClick} className={scheduleName}>
            <div>{schedule.name}</div>
            <div>{schedule.type}</div>
            <div>{schedule.timeMeridian}</div>
            <div>Location: {schedule.location}</div>
        </div>
    );
};