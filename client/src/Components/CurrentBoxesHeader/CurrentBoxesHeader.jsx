import React from "react";

export const CurrentBoxesHeader = ({onNext, onBack, currentDayDisplay, goToday})  => {
    return (
        <>
            <div id="CurrentBoxHeader">
                <div id="currentDayDisplay">{currentDayDisplay}:</div>

                <div>
                    <button onClick={goToday} id="todayButton">Today</button>
                </div>
            </div>
        </>

        
    )
};