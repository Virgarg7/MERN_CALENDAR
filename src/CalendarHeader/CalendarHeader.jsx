import React from "react";

export const CalendarHeader = ({ onNext, onBack, dateDisplay, goToday}) => {
    return (
        <div id="header">
            <div id="monthDisplay">{dateDisplay}</div>
            <div>
                <button onClick={goToday} id="todayButton">Today</button>

                <button onClick={onBack} id="backButton">Back</button>
                <button onClick={onNext} id="nextButton">Next</button>
            </div>
        </div>
    );
};