import React, { useState } from "react";

export const NewAssignmentEventModal = ( { onSave, onClose} ) => {
    const [className, setClassName] = useState("");
    const [assignmentName, setAssignmentName] = useState("");
    const [deadline, setDeadline] = useState("");
    const [error, setError] = useState(false);

    const hourOptions = [{label: "1", value: "1"}, {label: "2", value: "2"}, {label: "3", value: "3"}, 
        {label: "4", value: "4"}, {label: "5", value: "5"}, {label: "6", value: "6"}, {label: "7", value: "7"},
            {label: "8", value: "8"}, {label: "9", value: "9"}, {label: "10", value: "10"}, 
                {label: "11", value: "11"}, {label: "12", value: "12"}];

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

                <div id="AssignmentSelectContainer">
                    <input 
                        className={error ? "error" : ""}
                        value={deadline} 
                        onChange={e => setDeadline(e.target.value)} 
                        id="eventTitleInput" 
                        placeholder="Enter Assignment Deadline (ex. 11:59 PM)" 
                    /> 
                </div>

                 

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