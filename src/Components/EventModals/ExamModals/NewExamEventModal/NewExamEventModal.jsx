import React, { useState } from "react";

export const NewExamEventModal = ( { onSave, onClose} ) => {
    const [className, setClassName] = useState("");
    const [classType, setClassType] = useState("");
    const [classTime, setClassTime] = useState("");
    const [classLocation, setClassLocation] = useState("");
    const [repeat, setRepeat] = useState("");
    const [repeatDate, setRepeatDate] = useState("");
    const [error, setError] = useState(false);

    return (
        <>
            <div id="newEventModal">
                <h2>New Class/Club:</h2>

                <input 
                    className={error ? "error" : ""}
                    value={className} 
                    onChange={e => setClassName(e.target.value)} 
                    id="eventTitleInput" 
                    placeholder="Enter Class Name (ex. CS 1332)" 
                />

                <input 
                    className={error ? "error" : ""}
                    value={classType} 
                    onChange={e => setClassType(e.target.value)} 
                    id="eventTitleInput" 
                    placeholder="Enter Class Type (ex. Club, Lecture, Lab)" 
                />

                <input 
                    className={error ? "error" : ""}
                    value={classTime} 
                    onChange={e => setClassTime(e.target.value)} 
                    id="eventTitleInput" 
                    placeholder="Enter Class Time (ex. 11:00 AM)" 
                />  

                <input 
                    className={error ? "error" : ""}
                    value={classLocation} 
                    onChange={e => setClassLocation(e.target.value)} 
                    id="eventTitleInput" 
                    placeholder="Enter Class Location (ex. Klaus 2108)" 
                />

                <input 
                    className={error ? "error" : ""}
                    value={repeat} 
                    onChange={e => setRepeat(e.target.value)} 
                    id="eventTitleInput" 
                    placeholder="Is this class weekly? (Yes or No)" 
                />

                <input 
                    className=""
                    value={repeatDate} 
                    onChange={e => setRepeatDate(e.target.value)} 
                    id="eventTitleInput" 
                    placeholder="Enter day class ends (ex. 4/28/23)" 
                />

                <button 
                    onClick={() => {
                        if (className && classType && classTime 
                            && classLocation && repeat) {
                            setError(false);
                            onSave(className, classType, classTime, classLocation, repeat, repeatDate);
                        } else {
                            setError(true);
                        }
                    }}
                    id="saveButton">Save</button>

                <button 
                    onClick={onClose}
                    id="cancelButton">Cancel</button>
            </div>

            <div id="modalBackDrop"></div>
        </>
    );
};