import React, { useState } from "react";

export const DeleteAssignmentEventModal = ({ assignment, onSave, onClose }) => {
    const [className, setClassName] = useState(assignment.class);
    const [assignmentName, setAssignmentName] = useState(assignment.name);
    const [deadline, setDeadline] = useState(assignment.timeMeridian);
    const [isCompletedValue, setIsCompletedValue] = useState(assignment.isCompleted);
    const [error, setError] = useState(false);

    return (
        <>
            <div id="deleteEventModal">
                <h2>Edit/Delete Assignment:</h2>

                <input 
                    className={error ? "error" : ""}
                    value={assignmentName} 
                    onChange={e => setAssignmentName(e.target.value)} 
                    id="eventTitleInput" 
                    placeholder="Enter Assignment Name (ex. HW4)" 
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
                    value={deadline} 
                    onChange={e => setDeadline(e.target.value)} 
                    id="eventTitleInput" 
                    placeholder="Enter Assignment Deadline (ex. 11:59 PM)" 
                /> 

                <button 
                    onClick={() => {
                        if (assignmentName && className && deadline) {
                            setError(false);
                            onSave(assignmentName, className, deadline, isCompletedValue);
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