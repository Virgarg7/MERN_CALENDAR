import React from "react";

export const CurrentBoxesHeader = ({onNext, onBack, currentDayDisplay, goToday})  => {
    return (
        <>
            <div id="CurrentBoxHeader">
                <div id="currentDayDisplay">{currentDayDisplay}</div>

                <div>
                    <button onClick={goToday} id="todayButton">Today</button>
                </div>
            </div>

            <div id="currentBoxContainer">             
                    <div className="currentBox schedule"></div>
                    <div className="currentBox exams"></div>
                    <div className="currentBox assignments"></div>
            </div>
        </>

        
    )
};