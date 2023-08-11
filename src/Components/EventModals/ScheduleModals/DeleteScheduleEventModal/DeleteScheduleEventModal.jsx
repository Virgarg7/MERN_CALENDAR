import React, { useState } from "react";

export const DeleteScheduleEventModal = ({ schedule, onSave, onDelete }) => {
    const [className, setClassName] = useState(schedule.name);
    const [classType, setClassType] = useState(schedule.type);
    const [classTime, setClassTime] = useState(schedule.timeMeridian);
    const [classLocation, setClassLocation] = useState(schedule.location);
    //const [repeat, setRepeat] = useState("");
    //const [repeatDate, setRepeatDate] = useState("");
    const [isCompletedValue, setIsCompletedValue] = useState(schedule.isCompleted);
    const [error, setError] = useState(false);
    return (
        <>
            <div id="deleteEventModal">
                <h2>Edit/Delete Class</h2>

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

                <button 
                    onClick={() => {
                        if (className && classType && classTime 
                            && classLocation) {
                            setError(false);
                            onSave(className, classType, classTime, classLocation, isCompletedValue);
                        } else {
                            setError(true);
                        }
                    }}
                    id="saveButton">Save</button>

                <button onClick={onDelete} id="deleteButton">Delete</button>
            </div>

            <div id="modalBackDrop"></div>
        </>
    )
};