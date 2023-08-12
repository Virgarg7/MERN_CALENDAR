import React from "react";

export const Assignment = ({ assignment, onClick, onSave, onDelete }) => {
    const assignmentName = `assignment ${assignment.isCompleted === true ? "isCompleted" : ""}`;
    return (
        <div className={assignmentName}>
            <div onClick={onClick}>
                <div>{assignment.name}</div>
                <div>{assignment.class}</div>
                <div>Due: {assignment.timeMeridian}</div>
            </div>
            <div>
                <button onClick={onSave} id="editButton">Edit</button>
                <button onClick={onDelete} id="deleteEvent">–</button>
            </div>
        </div>
    );
};