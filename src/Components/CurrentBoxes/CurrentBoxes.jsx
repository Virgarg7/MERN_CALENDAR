import React from "react";

export const CurrentBoxes = ({currentDayDisplay})  => {
    return (
        <>
            <div id="currentDayDisplay">{currentDayDisplay}</div>

            <div id="currentBoxContainer">             
                <div className="currentBox schedule"></div>
                <div className="currentBox exams"></div>
                <div className="currentBox assignments"></div>
            </div>
        </>

        
    )
};