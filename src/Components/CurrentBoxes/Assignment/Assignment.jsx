import React from "react";

export const Assignment = ({ assignment, onClick }) => {
    return (
        <div onClick={onClick} className="assignment">
            <div>{assignment.name}</div>
            <div>{assignment.class}</div>
            <div>{assignment.time}</div>
            {}
        </div>
    );
};