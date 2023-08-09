import React from "react";

export const ExamBox = ({ onClick }) => {
    return (
        <>
            <div onClick={onClick} className="currentBox exams"></div>
        </>
    );
};