import React, { useEffect, useState } from "react";
import { hashMap } from "../util/hashFunctions";
import { eventsCompleted, dayOfDate } from "../util/dateFunctions";

export const useDate = (nav, currentDay, scheduleMap, examMap, assignmentMap) => {

    const [dateDisplay, setDateDisplay] = useState("");
    const [days, setDays] = useState([]);

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

        let newScheduleMap = hashMap(localStorage.schedule);
        let newExamMap = hashMap(localStorage.exam);
        let newAssignmentMap = hashMap(localStorage.assignment);

        const daysArr = []

        for (let i = paddingDaysPrev - 1; i >= 0; i--) {
            
            const dayString = (month == 0) 
                ? `12/${daysInPrevMonth - i}/${year - 1}` 
                :`${month}/${daysInPrevMonth - i}/${year}`;
            
            let numWeek = (month == 0) 
                ? dayOfDate(year - 1, daysInPrevMonth - i, 
                    `${new Date(year, month, 0).toLocaleDateString("en-us", { month: "long" } )}`)
                : dayOfDate(year, daysInPrevMonth - i, 
                    `${new Date(year, month, 0).toLocaleDateString("en-us", { month: "long" } )}`);

            daysArr.push({
                value: daysInPrevMonth - i,
                padding: true,
                eventSchedule: newScheduleMap.has(dayString) && !eventsCompleted(newScheduleMap, dayString),
                eventExam: newExamMap.has(dayString) && !eventsCompleted(newExamMap, dayString),
                eventAssignment: newAssignmentMap.has(dayString) && !eventsCompleted(newAssignmentMap, dayString),
                isToday: daysInPrevMonth - i == day && nav === 1,
                isCurrentDay: dayString == currentDay,
                isWeekend: (numWeek == 1 || numWeek == 0), 
                date: dayString,
            });
        }

        for (let i = 1; i <= daysInMonth; i++) {

            const dayString = `${month + 1}/${i}/${year}`;

            let numWeek = dayOfDate(year, i, 
                `${dt.toLocaleDateString("en-us", { month: "long" } )}`)

            daysArr.push({
                value: (i === 1) 
                    ? `${dt.toLocaleDateString("en-us", { month: "short" } )} ${i}` 
                    : i,
                padding: false,
                eventSchedule: newScheduleMap.has(dayString) && !eventsCompleted(newScheduleMap, dayString),
                eventExam: newExamMap.has(dayString) && !eventsCompleted(newExamMap, dayString),
                eventAssignment: newAssignmentMap.has(dayString) && !eventsCompleted(newAssignmentMap, dayString),
                isToday: i === day && nav === 0,
                isCurrentDay: dayString == currentDay,
                isWeekend: (numWeek == 1 || numWeek == 0),
                date: dayString,
            });
        }

        const nextMonth = new Date();
        nextMonth.setMonth(new Date().getMonth() + nav + 1);        

        for (let i = 1; i <= paddingDaysNext; i++) {

            const dayString = (month == 11) ? `1/${i}/${year + 1}`: `${month + 2}/${i}/${year}`;

            let numWeek = (month == 11) 
                ? dayOfDate(year + 1, i, 
                    `${new Date(year, month + 1, 1).toLocaleDateString("en-us", { month: "long" } )}`)
                : dayOfDate(year, i, 
                    `${new Date(year, month + 1, 1).toLocaleDateString("en-us", { month: "long" } )}`);

            daysArr.push({
                value: (i === 1) 
                    ? `${nextMonth.toLocaleDateString("en-us", { month: "short" } )} ${i}` 
                    : i,
                padding: true,
                eventSchedule: newScheduleMap.has(dayString) && !eventsCompleted(newScheduleMap, dayString),
                eventExam: newExamMap.has(dayString) && !eventsCompleted(newExamMap, dayString),
                eventAssignment: newAssignmentMap.has(dayString) && !eventsCompleted(newAssignmentMap, dayString),
                isToday: i === day && nav === -1,
                isCurrentDay: dayString == currentDay,
                isWeekend: (numWeek == 1 || numWeek == 0),
                date: dayString,
            });
        }

        setDays(daysArr);

    }, [nav, currentDay, scheduleMap, examMap, assignmentMap]);

    return {
        days, 
        dateDisplay
    };

};