import React from "react";

export const Assignment = ({ assignment, onClick }) => {
    const assignmentName = `assignment ${assignment.isCompleted === true ? "isCompleted" : ""}`;
    return (
        <div onClick={onClick} className={assignmentName}>
            <div>{assignment.name}</div>
            <div>{assignment.class}</div>
            <div>Due: {assignment.timeMeridian}</div>
            {}
        </div>
    );
};