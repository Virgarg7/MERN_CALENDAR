import React from "react";

export const Exam = ({ exam, onClick }) => {
    const examName = `exam ${exam.isCompleted === true ? "isCompleted" : ""}`;
    return (
        <div onClick={onClick} className={examName}>
            <div>{exam.name}</div>
            <div>{exam.class}</div>
            <div>Due: {exam.timeMeridian}</div>
            <div>Location: {exam.location}</div>
        </div>
    );
};