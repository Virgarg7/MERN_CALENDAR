import React from "react";

export const isLeapYear = (year => {
    if (year % 4 == 0) {
        if (year % 100 == 0) {
            if (year % 400 == 0) {
                return true; 
            } else {
                return false;
            }
        } else {
            return true;
        }
    }
    return false;
});

export const eventsCompleted = ((hashMap, dayString) => {
    let eventsCompleted = true;
    if (hashMap.has(dayString)) {
        hashMap.get(dayString).forEach(e => {
            if (e.isCompleted == false) {
                eventsCompleted = false;
            }
        })
    }
    return eventsCompleted;
})