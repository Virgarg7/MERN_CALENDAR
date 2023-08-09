import React, { useState, useEffect } from "react";
import { CalendarHeader } from "../Components/CalendarHeader";
import { Day } from "../Components//Day"
import { NewScheduleEventModal } from "../Components/EventModals/ScheduleModals/NewScheduleEventModal";
import { DeleteScheduleEventModal } from "../Components/EventModals/ScheduleModals/DeleteScheduleEventModal";
import { NewExamEventModal } from "../Components/EventModals/ExamModals/NewExamEventModal";
import { NewAssignmentEventModal} from "../Components/EventModals/AssignmentModals/NewAssignmentEventModal";
import { useDate } from "../Hooks/useDate";
import { CurrentBoxesHeader } from "../Components/CurrentBoxesHeader";
import { ScheduleBox } from "../Components/CurrentBoxes/ScheduleBox";
import { ExamBox } from "../Components/CurrentBoxes/ExamBox";
import { AssignmentBox } from "../Components/CurrentBoxes/AssignmentBox";

export const App = () => {

    const dtToday = new Date();
    const today = `${dtToday.getMonth() + 1}/${dtToday.getDate()}/${dtToday.getFullYear()}`;
    const [dayNav, setDayNav] = useState(0);

    // nav 0 is current month (render current month)
    const [nav, setNav] = useState(0);
    const [currentDay, setCurrentDay] = useState(today);
    const [scheduleBoxClicked, setScheduleBoxClicked] = useState(false);
    const [examBoxClicked, setExamBoxClicked] = useState(false);
    const [assignmentBoxClicked, setAssignmentBoxClicked] = useState(false);
    // list of hashmaps to store in local storage
    const [scheduleMap, setScheduleMap] = useState(
        localStorage.getItem('schedule') ? 
            new Map(JSON.parse(localStorage.schedule)) : 
            new Map()
    );
    const [examMap, setExamMap] = useState(
        localStorage.getItem('exam') ? 
            new Map(JSON.parse(localStorage.exam)) : 
            new Map()
    );
    const [assignmentMap, setAssignmentMap] = useState(
        localStorage.getItem('assignment') ? 
            new Map(JSON.parse(localStorage.assignment)) : 
            new Map()
    );

    // returns an events from the date
    //const eventForDate = date => maps.find(e => e.date === date)

    // updates local storage with string of events
    useEffect(() => {
        localStorage.schedule = JSON.stringify(Array.from(scheduleMap))
    }, [scheduleMap]);

    useEffect(() => {
        localStorage.exam = JSON.stringify(Array.from(examMap))
    }, [examMap]);

    useEffect(() => {
        localStorage.assignment = JSON.stringify(Array.from(assignmentMap))
    }, [assignmentMap]);

    const { days, dateDisplay } = useDate(nav, currentDay);

    return(
        <>
            <div id="container">
                <CalendarHeader 
                    dateDisplay={dateDisplay}
                    onNext={() => setNav(nav + 1)}
                    onBack={() => setNav(nav - 1)}
                    goToday={() => {
                        setNav(0);
                        setDayNav(0);
                        setCurrentDay(today);
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
                                setCurrentDay(d.date);
                            }}
                        />
                    ))}
                </div>

                <CurrentBoxesHeader 
                    currentDayDisplay={currentDay}
                    goToday={() => {
                        setNav(0);
                        setDayNav(0);
                        setCurrentDay(today);
                    }}
                />

                <div id="currentBoxContainer">

                    <ScheduleBox 
                        onClick={() => {
                            setScheduleBoxClicked(true);
                        }}
                    />

                    <ExamBox 
                        onClick={() => {
                            setExamBoxClicked(true);
                        }}
                    />
                    
                    <AssignmentBox 
                        onClick={() => {
                            setAssignmentBoxClicked(true);
                        }}
                    />
                </div>

            </div>

            {
                scheduleBoxClicked && 
                < NewScheduleEventModal
                    onClose={() => setScheduleBoxClicked(false)} 
                    onSave={(className, classType, classTime, classLocation, repeat, repeatDate) => {
                        let thisMap = new Map(JSON.parse(localStorage.schedule));
                        let scheduleEventObject = {
                            name: className,
                            type: classType,
                            time: classTime,
                            location: classLocation
                        }
                        if (thisMap.get(currentDay)) {
                            let equal = false;
                            thisMap.get(currentDay).forEach(className => {
                                if (JSON.stringify(className) == JSON.stringify(scheduleEventObject)) {
                                    equal = true;
                                }
                            });
                            if (equal == false) {
                                thisMap.set(thisMap.get(currentDay).push(scheduleEventObject));
                            }
                                            
                        } else {
                            thisMap.set(currentDay, [scheduleEventObject]);
                        }
                        setScheduleMap(thisMap);
                        setScheduleBoxClicked(false);
                    }}
                />
            }

            {
                examBoxClicked && 
                < NewExamEventModal
                    onClose={() => setExamBoxClicked(false)} 
                    onSave={(examName, className, examTime) => {
                        let thisMap = new Map(JSON.parse(localStorage.exam));
                        let examEventObject = {
                            name: examName,
                            class: className,
                            time: examTime
                        }
                        if (thisMap.get(currentDay)) {
                            let equal = false;
                            thisMap.get(currentDay).forEach(exam => {
                                if (JSON.stringify(exam) == JSON.stringify(examEventObject)) {
                                    equal = true;
                                }
                            });
                            if (equal == false) {
                                thisMap.set(thisMap.get(currentDay).push(examEventObject));
                            }
                                            
                        } else {
                            thisMap.set(currentDay, [examEventObject]);
                        }
                        setExamMap(thisMap);
                        setExamBoxClicked(false);
                    }}
                />
            }

            {
                assignmentBoxClicked && 
                < NewAssignmentEventModal
                    onClose={() => setAssignmentBoxClicked(false)} 
                    onSave={(assignmentName, className, deadline) => {
                        let thisMap = new Map(JSON.parse(localStorage.assignment));
                        let assignmentEventObject = {
                            name: assignmentName,
                            class: className,
                            time: deadline
                        }
                        if (thisMap.get(currentDay)) {
                            let equal = false;
                            thisMap.get(currentDay).forEach(assignment => {
                                if (JSON.stringify(assignment) == JSON.stringify(assignmentEventObject)) {
                                    equal = true;
                                }
                            });
                            if (equal == false) {
                                thisMap.set(thisMap.get(currentDay).push(assignmentEventObject));
                            }
                                            
                        } else {
                            thisMap.set(currentDay, [assignmentEventObject]);
                        }
                        setAssignmentMap(thisMap);
                        setAssignmentBoxClicked(false);
                    }}
                />
            }

            {
                /*
                currentDay && eventForDate(currentDay) && 
                <DeleteScheduleEventModal 
                    eventText={eventForDate(currentDay).title}
                    onClose={() => setCurrentDay(null)}
                    onDelete={() => {
                        setEvents(events.filter(e => e.date != currentDay));
                        setCurrentDay(null);
                    }}
                />   
                */ 
            }
        </>
    );
};