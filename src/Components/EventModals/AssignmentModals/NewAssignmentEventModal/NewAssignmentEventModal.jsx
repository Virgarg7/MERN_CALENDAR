import React, { useState } from "react";

export const NewAssignmentEventModal = ( { onSave, onClose} ) => {
    const [className, setClassName] = useState("");
    const [assignmentName, setAssignmentName] = useState("");
    const [deadline, setDeadline] = useState("");
    const [error, setError] = useState(false);

    return (
        <>
            <div id="newEventModal">
                <h2>New Assignment:</h2>

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
                            onSave(assignmentName, className, deadline);
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