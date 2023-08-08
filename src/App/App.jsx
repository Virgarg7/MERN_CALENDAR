import React, { useState, useEffect } from "react";
import { CalendarHeader } from "../CalendarHeader";
import { Day } from "../Day"

export const App = () => {

    // nav 0 is current month (render current month)
    const [nav, setNav] = useState(0);
    // list of days to display on calendar
    const [days, setDays] = useState([]);
    // Display month calendar is currently on
    const [dateDisplay, setDateDisplay] = useState("");
    // clicked is the current date clicked
    const [clicked, setClicked] = useState();
    // list of events to store in local storage
    const [events, setEvents] = useState(
        localStorage.getItem('events') ? 
            JSON.parse(localStorage.getItem('events')) : 
            []
    );

    // returns an events from the date
    const eventForDate = date => events.find(e => e.date === date)

    // updates local storage with string of events
    useEffect(() => {
        localStorage.setItem("events", JSON.stringify(events))
    }, [events]);

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
                    date: dayString
                })
            } else {
                daysArr.push({
                    value: "padding",
                    event: null,
                    isCurrentDay: false,
                    date: ""
                })
            }
        }

        setDays(daysArr);

    }, [events, nav]);

    return(
        <div id="container">
            <CalendarHeader />

            <div id="weekdays">
                <div>Sunday</div>
                <div>Monday</div>
                <div>Tuesday</div>
                <div>Wednesday</div>
                <div>Thursday</div>
                <div>Friday</div>
                <div>Saturday</div>
            </div>

            <div id="calendar">
                {days.map((d, index) => (
                    <Day
                        key={index}
                        day={d}
                        onClick={() => {
                            if (day.value != padding) {
                                setClicked(day.date);
                            }
                        }}
                    />
                ))}
            </div>
        </div>
    );
};