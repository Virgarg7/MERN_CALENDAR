import React from "react";
import { getAllEvents } from "../services/UserServices";

export const hashMap = (eventType => new Map(JSON.parse(eventType)));
export const setHashMap = (hashMap => JSON.stringify(Array.from(hashMap)))


export const returnAssignments = ((day) => {
    getAllEvents().then(events => {
        events.forEach(event => {
            if (event.currdaystr == day) {
                return (event.assignments);
            }
        });
    });
    return null;
})