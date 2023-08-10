import React from "react";

export const Exam = ({ exam, onClick }) => {
    return (
        <div onClick={onClick} className="exam">
            <div>{exam.name}</div>
            <div>{exam.class}</div>
            <div>Due: {exam.timeMeridian}</div>
            <div>Location: {exam.location}</div>
        </div>
    );
};