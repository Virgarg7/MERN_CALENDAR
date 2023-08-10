import React from "react";

export const AssignmentBoxHeader = ( { onClick }) => {
    return (
        <>
            <div id="AssignmentBoxHeader">
                <div id="assignmentDisplay">Assignments:</div>
                <button onClick={onClick}>+</button>
            </div>
                
                
        </>
    );
};