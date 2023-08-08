import React, { useState, useEffect } from "react";
import { CalendarHeader } from "../Components/CalendarHeader";
import { Day } from "../Components//Day"
import { NewEventModal } from "../Components//NewEventModal";
import { DeleteEventModal } from "../Components//DeleteEventModal";
import { useDate } from "../Hooks/useDate";
import { CurrentBoxes } from "../Components/CurrentBoxes";

export const App = () => {

    // nav 0 is current month (render current month)
    const [nav, setNav] = useState(0);
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

    const { days, dateDisplay } = useDate(events, nav);

    return(
        <>
            <div id="container">
                <CalendarHeader 
                    dateDisplay={dateDisplay}
                    onNext={() => setNav(nav + 1)}
                    onBack={() => setNav(nav - 1)}
                    goToday={() => {
                        setNav(0);
                    }}
                />

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
                                if (d.value != "padding") {
                                    setClicked(d.date);
                                }
                            }}
                        />
                    ))}
                </div>

                <CurrentBoxes />

                <div className="currentBox"></div>

            </div>

            {
                clicked && !eventForDate(clicked) && 
                < NewEventModal
                    onClose={() => setClicked(null)} 
                    onSave={title => {
                        setEvents([ ...events, { title, date: clicked }]);
                        setClicked(null);
                    }}
                />
            }

            {
                clicked && eventForDate(clicked) && 
                <DeleteEventModal 
                    eventText={eventForDate(clicked).title}
                    onClose={() => setClicked(null)}
                    onDelete={() => {
                        setEvents(events.filter(e => e.date != clicked));
                        setClicked(null);
                    }}
                />
            }
        </>
    );
};