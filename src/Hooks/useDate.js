import React, { useEffect, useState } from "react";

export const useDate = (events, nav) => {

    const [dateDisplay, setDateDisplay] = useState("");
    const [days, setDays] = useState([]);

    const eventForDate = date => events.find(e => e.date === date)

    useEffect(() => {
        const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thurday", "Friday", "Saturday"];
        const dt = new Date();

        if (nav !== 0) {
            dt.setMonth(new Date().getMonth() + nav);
        }

        const day = dt.getDate();
        const month = dt.getMonth();
        const year = dt.getFullYear();

        // (year, the next month, the last day of previous month, so basically giving the last day on the month)
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDayOfMonth = new Date(year, month, 1);

        const dateString = firstDayOfMonth.toLocaleDateString("en-us", {
            weekday: "long",
            year: "numeric",
            month: "numeric",
            day: "numeric"
        })
        setDateDisplay(`${dt.toLocaleDateString("en-us", { month: "long" } )} ${year}`);
        const paddingDays = weekdays.indexOf(dateString.split(", ")[0]);

        const daysArr = []

        for (let i = 1; i <= paddingDays + daysInMonth; i++) {
            const dayString = `${month + 1}/${i - paddingDays}/${year}`;

            if (i > paddingDays) {
                daysArr.push({
                    value: i - paddingDays,
                    event: eventForDate(dayString),
                    isCurrentDay: i - paddingDays === day && nav === 0,
                    date: dayString,
                });
            } else {
                daysArr.push({
                    value: "padding",
                    event: null,
                    isCurrentDay: false,
                    date: "",
                });
            }
        }

        setDays(daysArr);

    }, [events, nav]);

    return {
        days, 
        dateDisplay
    };

};