import React, { useState, useEffect } from "react";
import { CalendarHeader } from "../Components/CalendarHeader";
import { Day } from "../Components//Day"
import { NewScheduleEventModal } from "../Components/EventModals/ScheduleModals/NewScheduleEventModal";
import { DeleteScheduleEventModal } from "../Components/EventModals/ScheduleModals/DeleteScheduleEventModal";
import { NewExamEventModal } from "../Components/EventModals/ExamModals/NewExamEventModal";
import { NewAssignmentEventModal} from "../Components/EventModals/AssignmentModals/NewAssignmentEventModal";
import { useDate } from "../Hooks/useDate";
import { CurrentBoxesHeader } from "../Components/CurrentBoxesHeader";
import { ScheduleBoxHeader } from "../Components/CurrentBoxes/ScheduleBox/ScheduleBoxHeader";
import { ExamBoxHeader } from "../Components/CurrentBoxes/ExamBox/ExamBoxHeader";
import { AssignmentBoxHeader } from "../Components/CurrentBoxes/AssignmentBox/AssignmentBoxHeader";
import { Assignment } from "../Components/CurrentBoxes/AssignmentBox/Assignment";
import { Exam } from "../Components/CurrentBoxes/ExamBox/Exam";
import { Schedule } from "../Components/CurrentBoxes/ScheduleBox/Schedule";
import { DeleteAssignmentEventModal } from "../Components/EventModals/AssignmentModals/DeleteAssignmentEventModal";

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
    const [assignmentEventBoxClicked, setAssignmentEventBoxClicked] = useState(false);
    const [examEventBoxClicked, setExamEventBoxClicked] = useState(false);
    const [scheduleEventBoxClicked, setScheduleEventBoxClicked] = useState(false);
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
    const [mapsChanged, setMapsChanged] = useState(false);
    localStorage.schedule = JSON.stringify(Array.from(scheduleMap));
    localStorage.exam = JSON.stringify(Array.from(examMap));
    localStorage.assignment = JSON.stringify(Array.from(assignmentMap));
    
    // updates local storage with string of events
    useEffect(() => {
        localStorage.schedule = JSON.stringify(Array.from(scheduleMap));
        setMapsChanged(true);
    }, [scheduleMap]);

    useEffect(() => {
        localStorage.exam = JSON.stringify(Array.from(examMap));
        setMapsChanged(true);
    }, [examMap]);

    useEffect(() => {
        localStorage.assignment = JSON.stringify(Array.from(assignmentMap));
        setMapsChanged(true);
    }, [assignmentMap]);

    useEffect(() => {
        const dt = new Date();

        if (nav !== 0) {
            dt.setMonth(new Date().getMonth() + nav);
        }

        const month = dt.getMonth();
        const year = dt.getFullYear();
        if (nav != 0) {
            setCurrentDay(`${month + 1}/1/${year}`);
        } else {
            setCurrentDay(today);
        }
    }, [nav]);

    const [assignments, setAssignments] = useState(() => {
        let thisMap = new Map(JSON.parse(localStorage.assignment));
        return thisMap.get(currentDay);
    })

    useEffect(() => {
        let assignmentCurrentMap = new Map(JSON.parse(localStorage.assignment));
        setAssignments(assignmentCurrentMap.get(currentDay));
    }, [currentDay, assignmentMap]);

    const [completedAssignmentObject, setCompletedAssignmentObject] = useState();

    
    useEffect(() => {
        if (completedAssignmentObject) {
            let assignmentCurrentMap = new Map(JSON.parse(localStorage.assignment));
            let assignmentArr = assignmentCurrentMap.get(currentDay);
            let indexAssignment = -1;
            for (let i = 0; i < assignmentArr.length; i++) {
                if (JSON.stringify(assignmentArr[i]) == JSON.stringify(completedAssignmentObject)) {
                    indexAssignment = i;
                }
            }
            completedAssignmentObject.isCompleted = (completedAssignmentObject.isCompleted == false) ? true : false;
            
            assignmentArr[indexAssignment] = completedAssignmentObject;
            assignmentCurrentMap.set(currentDay, assignmentArr);
            setAssignmentMap(assignmentCurrentMap);
        }
    }, [completedAssignmentObject]);
    

    const [exams, setExams] = useState(() => {
        let thisMap = new Map(JSON.parse(localStorage.exam));
        return thisMap.get(currentDay);
    })

    useEffect(() => {
        let examCurrentMap = new Map(JSON.parse(localStorage.exam));
        setExams(examCurrentMap.get(currentDay));
    }, [currentDay, examMap]);

    const [completedExamObject, setCompletedExamObject] = useState();

    useEffect(() => {
        if (completedExamObject) {
            let examCurrentMap = new Map(JSON.parse(localStorage.exam));
            let examArr = examCurrentMap.get(currentDay);
            let indexExam = -1;
            for (let i = 0; i < examArr.length; i++) {
                if (JSON.stringify(examArr[i]) == JSON.stringify(completedExamObject)) {
                    indexExam = i;
                }
            }
            completedExamObject.isCompleted = (completedExamObject.isCompleted == false) ? true : false;
            
            examArr[indexExam] = completedExamObject;
            examCurrentMap.set(currentDay, examArr);
            setExamMap(examCurrentMap);
        }
    }, [completedExamObject]);

    const [schedules, setSchedules] = useState(() => {
        let thisMap = new Map(JSON.parse(localStorage.schedule));
        return thisMap.get(currentDay);
    })

    useEffect(() => {
        let scheduleCurrentMap = new Map(JSON.parse(localStorage.schedule));
        setSchedules(scheduleCurrentMap.get(currentDay));
    }, [currentDay, scheduleMap]);

    const [completedScheduleObject, setCompletedScheduleObject] = useState();
    
    useEffect(() => {
        if (completedScheduleObject) {
            let scheduleCurrentMap = new Map(JSON.parse(localStorage.schedule));
            let scheduleArr = scheduleCurrentMap.get(currentDay);
            let indexSchedule = -1;
            for (let i = 0; i < scheduleArr.length; i++) {
                if (JSON.stringify(scheduleArr[i]) == JSON.stringify(completedScheduleObject)) {
                    indexSchedule = i;
                }
            }
            completedScheduleObject.isCompleted = (completedScheduleObject.isCompleted == false) ? true : false;
            
            scheduleArr[indexSchedule] = completedScheduleObject;
            scheduleCurrentMap.set(currentDay, scheduleArr);
            setScheduleMap(scheduleCurrentMap);
        }
    }, [completedScheduleObject]);

    const [editAssignmentObject, setEditAssignmentObject] = useState();

    const { days, dateDisplay } = useDate(nav, currentDay, scheduleMap, examMap, assignmentMap);

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

                    <div className="currentBox schedules">
                        <ScheduleBoxHeader 
                            onClick={() => {
                                setScheduleBoxClicked(true);
                            }}
                        />
                        {schedules && schedules.map((s, index) => (
                            <Schedule
                                key={index}
                                schedule={s}
                                onClick={event => {
                                    switch (event.detail) {
                                      case 1: {
                                        setCompletedScheduleObject(s);
                                        break;
                                      }
                                      case 2: {
                                        setScheduleEventBoxClicked(true);
                                        setCompletedScheduleObject(s);
                                        break;
                                      }
                                      case 3: {
                                        console.log('triple click');
                                        break;
                                      }
                                      default: {
                                        break;
                                      }
                                    }
                                }}
                            />
                        ))}
                    </div>

                    <div className="currentBox exams">
                        <ExamBoxHeader 
                            onClick={() => {
                                setExamBoxClicked(true);
                            }}
                        />
                        {exams && exams.map((e, index) => (
                            <Exam
                                key={index}
                                exam={e}
                                onClick={event => {
                                    switch (event.detail) {
                                      case 1: {
                                        setCompletedExamObject(e);
                                        break;
                                      }
                                      case 2: {
                                        setExamEventBoxClicked(true);
                                        setCompletedExamObject(e);
                                        break;
                                      }
                                      case 3: {
                                        console.log('triple click');
                                        break;
                                      }
                                      default: {
                                        break;
                                      }
                                    }
                                }}
                            />
                        ))}
                    </div>

                    <div className="currentBox assignments">
                        <AssignmentBoxHeader 
                            onClick={() => {
                                setAssignmentBoxClicked(true);
                            }}
                        />
                        {assignments && assignments.map((a, index) => (
                            <Assignment
                                key={index}
                                assignment={a}
                                onClick={event => {
                                    switch (event.detail) {
                                      case 1: {
                                        setCompletedAssignmentObject(a);
                                        break;
                                      }
                                      case 2: {
                                        setAssignmentEventBoxClicked(true);
                                        setCompletedAssignmentObject(a);
                                        setEditAssignmentObject(a);
                                        break;
                                      }
                                      case 3: {
                                        console.log('triple click');
                                        break;
                                      }
                                      default: {
                                        break;
                                      }
                                    }
                                }}
                            />
                        ))}
                    </div>
                    
                </div>

            </div>

            {
                scheduleBoxClicked && 
                < NewScheduleEventModal
                    onClose={() => setScheduleBoxClicked(false)} 
                    onSave={(className, classType, classTime, classLocation) => {
                        let thisMap = new Map(JSON.parse(localStorage.schedule));
                        setMapsChanged(false);
                        let midDayTime = classTime.slice(-2);
                        let timeStr = classTime.slice(0, 5);
                        timeStr = timeStr.replace(":", "");
                        let timeInt = parseInt(timeStr);
                        if (midDayTime == "AM" && (timeInt > 1159 && timeInt < 1300)) {
                            timeInt -= 1200;
                        }
                        if (midDayTime == "PM" && timeInt < 1200) {
                            timeInt += 1200;
                        }
                        let scheduleEventObject = {
                            name: className,
                            type: classType,
                            time: timeInt,
                            timeMeridian: classTime,
                            location: classLocation,
                            isCompleted: false
                        }
                        if (thisMap.get(currentDay)) {
                            let equal = false;
                            thisMap.get(currentDay).forEach(className => {
                                if (JSON.stringify(className) == JSON.stringify(scheduleEventObject)) {
                                    equal = true;
                                }
                            });
                            if (equal == false) {
                                let arrSchedule = thisMap.get(currentDay);
                                arrSchedule.push(scheduleEventObject);
                                arrSchedule.sort((a, b) => {
                                    return a.time - b.time 
                                        || a.name.localeCompare(b.name) 
                                            || a.type.localeCompare(b.type);
                                });
                                thisMap.set(currentDay, arrSchedule);
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
                    onSave={(examName, className, examTime, examLocation) => {
                        let thisMap = new Map(JSON.parse(localStorage.exam));
                        setMapsChanged(false);
                        let midDayTime = examTime.slice(-2);
                        let timeStr = examTime.slice(0, 5);
                        timeStr = timeStr.replace(":", "");
                        let timeInt = parseInt(timeStr);
                        if (midDayTime == "AM" && (timeInt > 1159 && timeInt < 1300)) {
                            timeInt -= 1200;
                        }
                        if (midDayTime == "PM" && timeInt < 1200) {
                            timeInt += 1200;
                        }
                        let examEventObject = {
                            name: examName,
                            class: className,
                            time: timeInt,
                            timeMeridian: examTime,
                            location: examLocation,
                            isCompleted: false
                        }
                        if (thisMap.get(currentDay)) {
                            let equal = false;
                            thisMap.get(currentDay).forEach(exam => {
                                if (JSON.stringify(exam) == JSON.stringify(examEventObject)) {
                                    equal = true;
                                }
                            });
                            if (equal == false) {
                                let arrExams = thisMap.get(currentDay);
                                arrExams.push(examEventObject);
                                arrExams.sort((a, b) => {
                                    return a.time - b.time 
                                        || a.class.localeCompare(b.class) 
                                            || a.name.localeCompare(b.name);
                                });
                                thisMap.set(currentDay, arrExams);
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
                        setMapsChanged(false);
                        let midDayTime = deadline.slice(-2);
                        let timeStr = deadline.slice(0, 5);
                        timeStr = timeStr.replace(":", "");
                        let timeInt = parseInt(timeStr);
                        if (midDayTime == "AM" && (timeInt > 1159 && timeInt < 1300)) {
                            timeInt -= 1200;
                        }
                        if (midDayTime == "PM" && timeInt < 1200) {
                            timeInt += 1200;
                        }
                        let assignmentEventObject = {
                            name: assignmentName,
                            class: className,
                            time: timeInt,
                            timeMeridian: deadline,
                            isCompleted: false
                        }
                        if (thisMap.get(currentDay)) {
                            let equal = false;
                            thisMap.get(currentDay).forEach(assignment => {
                                if (JSON.stringify(assignment) == JSON.stringify(assignmentEventObject)) {
                                    equal = true;
                                }
                            });
                            if (equal == false) {
                                let arrAssignments = thisMap.get(currentDay);
                                arrAssignments.push(assignmentEventObject);
                                arrAssignments.sort((a, b) => {
                                    return a.time - b.time 
                                        || a.class.localeCompare(b.class) 
                                            || a.name.localeCompare(b.name);
                                });
                                thisMap.set(currentDay, arrAssignments);
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
                
                assignmentEventBoxClicked &&
                <DeleteAssignmentEventModal
                    assignment={editAssignmentObject}
                    onSave={(assignmentName, className, deadline, isCompletedValue) => {
                        let thisMap = new Map(JSON.parse(localStorage.assignment));
                        let midDayTime = deadline.slice(-2);
                        let timeStr = deadline.slice(0, 5);
                        timeStr = timeStr.replace(":", "");
                        let timeInt = parseInt(timeStr);
                        if (midDayTime == "AM" && (timeInt > 1159 && timeInt < 1300)) {
                            timeInt -= 1200;
                        }
                        if (midDayTime == "PM" && timeInt < 1200) {
                            timeInt += 1200;
                        }
                        let assignmentEventObject = {
                            name: assignmentName,
                            class: className,
                            time: timeInt,
                            timeMeridian: deadline,
                            isCompleted: !isCompletedValue
                        }
                        let currAssignmentArr = thisMap.get(currentDay);
                        let equal = false;
                        if (JSON.stringify(editAssignmentObject) == JSON.stringify(assignmentEventObject)) {
                            equal = true;
                        }
                        if (equal == false) {
                            let index = -1;
                            for (let i = 0; i < currAssignmentArr.length; i++) {
                                if (JSON.stringify(currAssignmentArr[i]) == JSON.stringify(editAssignmentObject)) {
                                    index = i;
                                }
                            }
                            currAssignmentArr.splice(index, 1);
                            currAssignmentArr.push(assignmentEventObject);
                            currAssignmentArr.sort((a, b) => {
                                return a.time - b.time 
                                    || a.class.localeCompare(b.class) 
                                        || a.name.localeCompare(b.name);
                            });
                            thisMap.set(currentDay, currAssignmentArr);
                            setAssignmentMap(thisMap);
                        }
                        setEditAssignmentObject(null);
                        setAssignmentEventBoxClicked(false)
                    }}
                    onDelete={() => {
                        //setEvents(events.filter(e => e.date != currentDay));
                        let thisMap = new Map(JSON.parse(localStorage.assignment));
                        let currAssignmentArr = thisMap.get(currentDay);
                        let index = -1;
                        for (let i = 0; i < currAssignmentArr.length; i++) {
                            if (JSON.stringify(currAssignmentArr[i]) == JSON.stringify(editAssignmentObject)) {
                                index = i;
                            }
                        }
                        currAssignmentArr.splice(index, 1);
                        if (currAssignmentArr.length == 0) {
                            thisMap.delete(currentDay);
                            setAssignmentMap(thisMap);
                            setEditAssignmentObject(null);
                            setAssignmentEventBoxClicked(false);
                        } else {
                            thisMap.set(currentDay, currAssignmentArr);
                            setAssignmentMap(thisMap);
                            setEditAssignmentObject(null);
                            setAssignmentEventBoxClicked(false);
                        }
                        
                    }}
                />   
                
            }
        </>
    );
};