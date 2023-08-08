import React, { useEffect, useState } from "react";

export const useDate = (events, nav) => {

    const [dateDisplay, setDateDisplay] = useState("");
    const [days, setDays] = useState([]);

    const eventForDate = date => events.find(e => e.date === date)

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

        const daysArr = []

        for (let i = paddingDaysPrev - 1; i >= 0; i--) {
            const dayString = `${month}/${daysInPrevMonth - i}/${year}`;

            daysArr.push({
                value: daysInPrevMonth - i,
                padding: true,
                event: eventForDate(dayString),
                isCurrentDay: daysInPrevMonth - i == day && nav === 1,
                date: dayString,
            });
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const dayString = `${month + 1}/${i}/${year}`;

            daysArr.push({
                value: (i === 1) 
                    ? `${dt.toLocaleDateString("en-us", { month: "short" } )} ${i}` 
                    : i,
                padding: false,
                event: eventForDate(dayString),
                isCurrentDay: i === day && nav === 0,
                date: dayString,
            });
        }

        const nextMonth = new Date();
        nextMonth.setMonth(new Date().getMonth() + 1);

        for (let i = 1; i <= paddingDaysNext; i++) {
            const dayString = `${month + 2}/${i}/${year}`;

            daysArr.push({
                value: (i === 1) 
                    ? `${nextMonth.toLocaleDateString("en-us", { month: "short" } )} ${i}` 
                    : i,
                padding: true,
                event: eventForDate(dayString),
                isCurrentDay: i === day && nav === -1,
                date: dayString,
            });
        }

        setDays(daysArr);

    }, [events, nav]);

    return {
        days, 
        dateDisplay
    };

};