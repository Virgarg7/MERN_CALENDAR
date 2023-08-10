import React from "react";

export const ScheduleBoxHeader = ({ onClick }) => {
    return (
        <>
            <div id="ScheduleBoxHeader">
                <div id="scheduleDisplay">Schedule:</div>
                <button onClick={onClick}>+</button>
            </div>   
        </>
    );
};