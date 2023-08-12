import React from "react";

export const ExamBoxHeader = ({ onClick }) => {
    return (
        <>
            <div id="ExamBoxHeader">
                <div id="examDisplay">Exams:</div>
                <button onClick={onClick}>+</button>
            </div>   
        </>
    );
};