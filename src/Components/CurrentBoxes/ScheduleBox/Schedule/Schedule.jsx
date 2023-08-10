import React from "react";

export const Schedule = ({ schedule, onClick }) => {
    return (
        <div onClick={onClick} className="exam">
            <div>{schedule.name}</div>
            <div>{schedule.type}</div>
            <div>{schedule.timeMeridian}</div>
            <div>Location: {schedule.location}</div>
        </div>
    );
};