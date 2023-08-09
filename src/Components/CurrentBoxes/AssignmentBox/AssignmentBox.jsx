import React from "react";

export const AssignmentBox = ( { onClick }) => {
    return (
        <>
            <div onClick={onClick} className="currentBox assignments"></div>
        </>
    );
};