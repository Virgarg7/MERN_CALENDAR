import React, { useEffect, useState } from "react";

export const useDate = (nav, currentDay, mapsChanged) => {

    const [dateDisplay, setDateDisplay] = useState("");
    const [days, setDays] = useState([]);

    //const eventForDate = date => events.find(e => e.date === date)

    useEffect(() => {
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const dt = new Date();

        if (nav !== 0) {
            dt.setMonth(new Date().getMonth() + nav);
        }

        const day = dt.getDate();
        const month = dt.getMonth();
        const year = dt.getFullYear();

        setDateDisplay(`${dt.toLocaleDateString("en-us", { month: "long" } )} ${year}`);

        // (year, the next month, the last day of previous month, so basically giving the last day on the month)
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const daysInPrevMonth = new Date(year, month, 0).getDate();
        
        const firstDayOfMonth = new Date(year, month, 1);
        const firstDateString = firstDayOfMonth.toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "numeric",
            day: "numeric"
        })
        const paddingDaysPrev = weekdays.indexOf(firstDateString.split(", ")[0]);

        const lastDayInMonth = new Date(year, month + 1, 0);
        const lastDateString = lastDayInMonth.toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "numeric",
            day: "numeric"
        })
        const paddingDaysNext =  6 - (weekdays.indexOf(lastDateString.split(", ")[0]));

        let newScheduleMap = new Map(JSON.parse(localStorage.schedule));
        let newExamMap = new Map(JSON.parse(localStorage.exam));
        let newAssignmentMap = new Map(JSON.parse(localStorage.assignment));

        const daysArr = []

        for (let i = paddingDaysPrev - 1; i >= 0; i--) {
            const dayString = `${month}/${daysInPrevMonth - i}/${year}`;
        
            let leapYear = false;
            if (year % 4 == 0) {
                if (year % 100 == 0) {
                    if (year % 400 == 0) {
                        leapYear = true; 
                    } else {
                        leapYear = false;
                    }
                } else {
                    leapYear = true;
                }
            }

            let numWeek = year % 100;
            numWeek = numWeek + parseInt(numWeek / 4);
            numWeek += (daysInPrevMonth - i);
            let monthStr = `${new Date(year, month, 0).toLocaleDateString("en-us", { month: "long" } )}`;

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

            daysArr.push({
                value: daysInPrevMonth - i,
                padding: true,
                eventSchedule: newScheduleMap.has(dayString),
                eventExam: newExamMap.has(dayString),
                eventAssignment: newAssignmentMap.has(dayString),
                isToday: daysInPrevMonth - i == day && nav === 1,
                isCurrentDay: dayString == currentDay,
                isWeekend: (numWeek == 1 || numWeek == 0), 
                date: dayString,
            });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayString = `${month + 1}/${i}/${year}`;

            let leapYear = false;
            if (year % 4 == 0) {
                if (year % 100 == 0) {
                    if (year % 400 == 0) {
                        leapYear = true; 
                    } else {
                        leapYear = false;
                    }
                } else {
                    leapYear = true;
                }
            }

            let numWeek = year % 100;
            numWeek = numWeek + parseInt(numWeek / 4);
            numWeek += (i);
            let monthStr = `${dt.toLocaleDateString("en-us", { month: "long" } )}`;

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

            daysArr.push({
                value: (i === 1) 
                    ? `${dt.toLocaleDateString("en-us", { month: "short" } )} ${i}` 
                    : i,
                padding: false,
                eventSchedule: newScheduleMap.has(dayString),
                eventExam: newExamMap.has(dayString),
                eventAssignment: newAssignmentMap.has(dayString),
                isToday: i === day && nav === 0,
                isCurrentDay: dayString == currentDay,
                isWeekend: (numWeek == 1 || numWeek == 0),
                date: dayString,
            });
        }

        const nextMonth = new Date();
        nextMonth.setMonth(new Date().getMonth() + nav + 1);        

        for (let i = 1; i <= paddingDaysNext; i++) {
            const dayString = `${month + 2}/${i}/${year}`;

            let leapYear = false;
            if (year % 4 == 0) {
                if (year % 100 == 0) {
                    if (year % 400 == 0) {
                        leapYear = true; 
                    } else {
                        leapYear = false;
                    }
                } else {
                    leapYear = true;
                }
            }

            let numWeek = year % 100;
            numWeek = numWeek + parseInt(numWeek / 4);
            numWeek += (i);
            let monthStr = `${new Date(year, month + 1, 1).toLocaleDateString("en-us", { month: "long" } )}`;

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
            
            daysArr.push({
                value: (i === 1) 
                    ? `${nextMonth.toLocaleDateString("en-us", { month: "short" } )} ${i}` 
                    : i,
                padding: true,
                eventSchedule: newScheduleMap.has(dayString),
                eventExam: newExamMap.has(dayString),
                eventAssignment: newAssignmentMap.has(dayString),
                isToday: i === day && nav === -1,
                isCurrentDay: dayString == currentDay,
                isWeekend: (numWeek == 1 || numWeek == 0),
                date: dayString,
            });
        }

        setDays(daysArr);

    }, [nav, currentDay, mapsChanged]);

    return {
        days, 
        dateDisplay
    };

};