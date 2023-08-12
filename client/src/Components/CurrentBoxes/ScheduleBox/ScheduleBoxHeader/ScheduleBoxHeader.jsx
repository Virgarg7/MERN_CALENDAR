import React from "react";

export const ScheduleBoxHeader = ({ onClick }) => {
    return (
        <>
            <div id="ScheduleBoxHeader">
                <div id="scheduleDisplay">Classes:</div>
                <button onClick={onClick}>+</button>
            </div>   
        </>
    );
};