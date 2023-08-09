import React from "react";

export const ScheduleBox = ({ onClick }) => {
    return (
        <>
            <div onClick={onClick} className="currentBox schedule"></div>
        </>
    );
};