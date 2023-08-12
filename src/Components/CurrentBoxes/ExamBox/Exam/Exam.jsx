import React from "react";

export const Exam = ({ exam, onClick, onSave, onDelete }) => {
    const examName = `exam ${exam.isCompleted === true ? "isCompleted" : ""}`;
    return (
        <div className={examName}>
            <div onClick={onClick}>
                <div>{exam.name}</div>
                <div>{exam.class}</div>
                <div>Due: {exam.timeMeridian}</div>
                <div>Location: {exam.location}</div>
            </div>

            <div>
                <button onClick={onSave} id="editButton">Edit</button>
                <button onClick={onDelete} id="deleteEvent">–</button>
            </div>
            
        </div>
    );
};