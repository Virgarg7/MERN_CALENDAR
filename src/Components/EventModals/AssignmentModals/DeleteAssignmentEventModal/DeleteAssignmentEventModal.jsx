import React from "react";

export const DeleteAssignmentEventModal = ({ onDelete, eventText, onClose }) => {
    return (
        <>
            <div id="deleteEventModal">
                <h2>Edit/Delete Assignment:</h2>

                <p id="eventText">{eventText}</p>

                <button onClick={onClose} id="closeButton">Close</button>
                <button onClick={onDelete} id="deleteButton">Delete</button>
            </div>

            <div id="modalBackDrop"></div>
        </>
    )
};