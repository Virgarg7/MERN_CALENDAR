import React from "react";

export const Schedule = ({ schedule, onClick, onSave, onDelete }) => {
    const scheduleName = `schedule ${schedule.isCompleted === true ? "isCompleted" : ""}`;
    return (
        <div className={scheduleName}>
            <div onClick={onClick}>
                <div>{schedule.name}</div>
                <div>{schedule.type}</div>
                <div>{schedule.timeMeridian}</div>
                <div>Location: {schedule.location}</div>
            </div>

            <div>
                <button onClick={onSave} id="editButton">Edit</button>
                <button onClick={onDelete} id="deleteEvent">–</button>
            </div>
            
        </div>
    );
};