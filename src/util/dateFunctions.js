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

export const dayOfDate = ((year, date, monthStr) => {
    let leapYear = isLeapYear(year);

    let numWeek = year % 100;
    numWeek = numWeek + parseInt(numWeek / 4);
    numWeek += date;

    switch (monthStr) {
        case "January":
            if (leapYear == true) {
                numWeek += 0;
            } else {
                numWeek += 1;
            }
            break;
        case "February":
            if (leapYear == true) {
                numWeek += 3;
            } else {
                numWeek += 4;
            }
            break;
        case "March":
            numWeek += 4;
            break;
        case "April":
            numWeek += 0;
            break;
        case "May":
            numWeek += 2;
            break;
        case "June":
            numWeek += 5;
            break;
        case "July":
            numWeek += 0;
            break;
        case "August":
            numWeek += 3;
            break;
        case "September":
            numWeek += 6;
            break;
        case "October":
            numWeek += 1;
            break;
        case "November":
            numWeek += 4;
            break;
        case "December":
            numWeek += 6;
            break;
    }

    if (year >= 2000) {
        numWeek -= 1;
    }

    numWeek %= 7;

    return numWeek;
})