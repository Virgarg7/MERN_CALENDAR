import React from "react";

export const AssignmentBox = ( { onClick }) => {
    return (
        <>
            <div className="currentBox assignments">
                <div id="AssignmentBoxHeader">
                    <div id="assignmentDisplay">Assignments:</div>
                    <button onClick={onClick}>+</button>
                </div>
                
                
            </div>
        </>
    );
};