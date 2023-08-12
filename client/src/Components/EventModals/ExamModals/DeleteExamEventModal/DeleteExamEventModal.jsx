import React, { useState } from "react";

export const DeleteExamEventModal = ({ exam, onSave, onClose }) => {
    const [className, setClassName] = useState(exam.class);
    const [examName, setExamName] = useState(exam.name);
    const [examTime, setExamTime] = useState(exam.timeMeridian);
    const [examLocation, setExamLocation] = useState(exam.location);
    const [isCompletedValue, setIsCompletedValue] = useState(exam.isCompleted);
    const [error, setError] = useState(false);

    return (
        <>
            <div id="deleteEventModal">
                <h2>Edit/Delete Exam:</h2>

                <input 
                    className={error ? "error" : ""}
                    value={examName} 
                    onChange={e => setExamName(e.target.value)} 
                    id="eventTitleInput" 
                    placeholder="Enter Test/Quiz Name (ex. Exam 1)" 
                />

                <input 
                    className={error ? "error" : ""}
                    value={className} 
                    onChange={e => setClassName(e.target.value)} 
                    id="eventTitleInput" 
                    placeholder="Enter Class Name (ex. CS 1332)" 
                />

                <input 
                    className={error ? "error" : ""}
                    value={examTime} 
                    onChange={e => setExamTime(e.target.value)} 
                    id="eventTitleInput" 
                    placeholder="Enter Exam Time (ex. 3:00 PM)" 
                />  

                <input 
                    className=""
                    value={examLocation} 
                    onChange={e => setExamLocation(e.target.value)} 
                    id="eventTitleInput" 
                    placeholder="Enter Exam Location (ex. Klaus 2108)" 
                />  

                <button 
                    onClick={() => {
                        if (examName && className && examTime) {
                            setError(false);
                            onSave(examName, className, examTime, examLocation, isCompletedValue);
                        } else {
                            setError(true);
                        }
                    }}
                    id="saveButton">Save</button>

                <button onClick={onClose} id="deleteButton">Cancel</button>    
            </div>

            <div id="modalBackDrop"></div>
        </>
    )
};