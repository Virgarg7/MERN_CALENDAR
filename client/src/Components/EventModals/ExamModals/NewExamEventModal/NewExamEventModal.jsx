import React, { useState } from "react";

export const NewExamEventModal = ( { onSave, onClose} ) => {
    const [className, setClassName] = useState("");
    const [examName, setExamName] = useState("");
    const [examTime, setExamTime] = useState("");
    const [examLocation, setExamLocation] = useState("");
    const [error, setError] = useState(false);

    return (
        <>
            <div id="newEventModal">
                <h2>New Test/Quiz:</h2>

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
                            onSave(examName, className, examTime, examLocation);
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