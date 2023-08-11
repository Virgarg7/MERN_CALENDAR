import React, { useState, useEffect } from "react";
import { CalendarHeader } from "../Components/CalendarHeader";
import { Day } from "../Components//Day"
import { NewScheduleEventModal } from "../Components/EventModals/ScheduleModals/NewScheduleEventModal";
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
import { DeleteExamEventModal } from "../Components/EventModals/ExamModals/DeleteExamEventModal";
import { DeleteAssignmentEventModal } from "../Components/EventModals/AssignmentModals/DeleteAssignmentEventModal";
import { DeleteScheduleEventModal } from "../Components/EventModals/ScheduleModals/DeleteScheduleEventModal";
import { hashMap, setHashMap } from "../util/hashFunctions"


//let hashMap = (eventType => new Map(JSON.parse(eventType)));
//let setHashMap = (hashMap => JSON.stringify(Array.from(hashMap)))

let timeValue = (timeMeridian => {
    let midDayTime = timeMeridian.slice(-2);
    let timeStr = timeMeridian.slice(0, 5);
    timeStr = timeStr.replace(":", "");
    let timeInt = parseInt(timeStr);
    if (midDayTime == "AM" && (timeInt > 1159 && timeInt < 1300)) {
        timeInt -= 1200;
    }
    if (midDayTime == "PM" && timeInt < 1200) {
        timeInt += 1200;
    }
    return timeInt;
});

let eventInMap = ((hashMap, eventObj, day) => {
    let equal = false;
    hashMap.get(day).forEach(event => {
        if (JSON.stringify(event) == JSON.stringify(eventObj)) {
            equal = true;
        }
    });
    return equal;
});

let removeEvent = ((arr, eventObj) => {
    let index = -1;
    for (let i = 0; i < arr.length; i++) {
        if (JSON.stringify(arr[i]) == JSON.stringify(eventObj)) {
            index = i;
        }
    }
    arr.splice(index, 1);
});

let setDeleteMap = ((hashMap, arr, day) => {
    if (arr.length == 0) {
        hashMap.delete(day);
    } else {
        hashMap.set(day, arr);
    }
});


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
            hashMap(localStorage.schedule) : 
            new Map()
    );
    const [examMap, setExamMap] = useState(
        localStorage.getItem('exam') ? 
            hashMap(localStorage.exam) : 
            new Map()
    );
    const [assignmentMap, setAssignmentMap] = useState(
        localStorage.getItem('assignment') ? 
            hashMap(localStorage.assignment) : 
            new Map()
    );
    const [mapsChanged, setMapsChanged] = useState(false);
    localStorage.schedule = setHashMap(scheduleMap);
    localStorage.exam = setHashMap(examMap);
    localStorage.assignment = setHashMap(assignmentMap);
    
    // updates local storage with string of events
    useEffect(() => {
        localStorage.schedule = setHashMap(scheduleMap);
        setMapsChanged(true);
    }, [scheduleMap]);

    useEffect(() => {
        localStorage.exam = setHashMap(examMap);
        setMapsChanged(true);
    }, [examMap]);

    useEffect(() => {
        localStorage.assignment = setHashMap(assignmentMap);
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
        let thisMap = hashMap(localStorage.assignment);
        return thisMap.get(currentDay);
    })

    useEffect(() => {
        let assignmentCurrentMap = hashMap(localStorage.assignment);
        setAssignments(assignmentCurrentMap.get(currentDay));
    }, [currentDay, assignmentMap]);

    const [completedAssignmentObject, setCompletedAssignmentObject] = useState();

    
    useEffect(() => {
        if (completedAssignmentObject) {
            let assignmentCurrentMap = hashMap(localStorage.assignment);
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
        let thisMap = hashMap(localStorage.exam);
        return thisMap.get(currentDay);
    })

    useEffect(() => {
        let examCurrentMap = hashMap(localStorage.exam);
        setExams(examCurrentMap.get(currentDay));
    }, [currentDay, examMap]);

    const [completedExamObject, setCompletedExamObject] = useState();

    useEffect(() => {
        if (completedExamObject) {
            let examCurrentMap = hashMap(localStorage.exam);
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
        let thisMap = hashMap(localStorage.schedule);
        return thisMap.get(currentDay);
    })

    useEffect(() => {
        let scheduleCurrentMap = hashMap(localStorage.schedule);
        setSchedules(scheduleCurrentMap.get(currentDay));
    }, [currentDay, scheduleMap]);

    const [completedScheduleObject, setCompletedScheduleObject] = useState();
    
    useEffect(() => {
        if (completedScheduleObject) {
            let scheduleCurrentMap = hashMap(localStorage.schedule);
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
    const [editExamObject, setEditExamObject] = useState();
    const [editScheduleObject, setEditScheduleObject] = useState();

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
                    <div>Sun</div>
                    <div>Mon</div>
                    <div>Tue</div>
                    <div>Wed</div>
                    <div>Thu</div>
                    <div>Fri</div>
                    <div>Sat</div>
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

                    <div className="currentBox">
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
                                        setEditScheduleObject(s);
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

                    <div className="currentBox">
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
                                        setEditExamObject(e);
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

                    <div className="currentBox">
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
                        let thisMap = hashMap(localStorage.schedule);
                        setMapsChanged(false);
                        let scheduleEventObject = {
                            name: className,
                            type: classType,
                            time: timeValue(classTime),
                            timeMeridian: classTime,
                            location: classLocation,
                            isCompleted: false
                        }
                        if (thisMap.get(currentDay)) {
                            if (!(eventInMap(thisMap, scheduleEventObject, currentDay))) {
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
                        let thisMap = hashMap(localStorage.exam);
                        setMapsChanged(false);
                        let examEventObject = {
                            name: examName,
                            class: className,
                            time: timeValue(examTime),
                            timeMeridian: examTime,
                            location: examLocation,
                            isCompleted: false
                        }
                        if (thisMap.get(currentDay)) {
                            if (!(eventInMap(thisMap, examEventObject, currentDay))) {
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
                        let thisMap = hashMap(localStorage.assignment);
                        setMapsChanged(false);
                        let assignmentEventObject = {
                            name: assignmentName,
                            class: className,
                            time: timeValue(deadline),
                            timeMeridian: deadline,
                            isCompleted: false
                        }
                        if (thisMap.get(currentDay)) {
                            if (!(eventInMap(thisMap, assignmentEventObject, currentDay))) {
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
                scheduleEventBoxClicked &&
                <DeleteScheduleEventModal
                    schedule={editScheduleObject}
                    onSave={(className, classType, classTime, classLocation, isCompletedValue) => {
                        let thisMap = hashMap(localStorage.schedule);
                        let scheduleEventObject = {
                            name: className,
                            type: classType,
                            time: timeValue(classTime),
                            timeMeridian: classTime,
                            location: classLocation,
                            isCompleted: !isCompletedValue
                        }
                        let currScheduleArr = thisMap.get(currentDay);
                        if (JSON.stringify(editScheduleObject) != JSON.stringify(scheduleEventObject)) {
                            let index = -1;
                            for (let i = 0; i < currScheduleArr.length; i++) {
                                if (JSON.stringify(currScheduleArr[i]) == JSON.stringify(editScheduleObject)) {
                                    index = i;
                                }
                            }
                            currScheduleArr.splice(index, 1);
                            currScheduleArr.push(scheduleEventObject);
                            currScheduleArr.sort((a, b) => {
                                return a.time - b.time 
                                    || a.class.localeCompare(b.class) 
                                        || a.name.localeCompare(b.name);
                            });
                            thisMap.set(currentDay, currScheduleArr);
                            setScheduleMap(thisMap);
                        }
                        setEditScheduleObject(null);
                        setScheduleEventBoxClicked(false)
                    }}
                    onDelete={() => {
                        let thisMap = hashMap(localStorage.schedule);
                        let currScheduleArr = thisMap.get(currentDay);
                        removeEvent(currScheduleArr, editScheduleObject);
                        setDeleteMap(thisMap, currScheduleArr, currentDay);
                        setScheduleMap(thisMap);
                        setEditScheduleObject(null);
                        setScheduleEventBoxClicked(false);
                        
                    }}
                />    
            }

            {
                examEventBoxClicked &&
                <DeleteExamEventModal
                    exam={editExamObject}
                    onSave={(examName, className, examTime, examLocation, isCompletedValue) => {
                        let thisMap = hashMap(localStorage.exam);
                        let examEventObject = {
                            name: examName,
                            class: className,
                            time: timeValue(examTime),
                            timeMeridian: examTime,
                            location: examLocation,
                            isCompleted: !isCompletedValue
                        }
                        let currExamArr = thisMap.get(currentDay);
                        if (JSON.stringify(editExamObject) != JSON.stringify(examEventObject)) {
                            let index = -1;
                            for (let i = 0; i < currExamArr.length; i++) {
                                if (JSON.stringify(currExamArr[i]) == JSON.stringify(editExamObject)) {
                                    index = i;
                                }
                            }
                            currExamArr.splice(index, 1);
                            currExamArr.push(examEventObject);
                            currExamArr.sort((a, b) => {
                                return a.time - b.time 
                                    || a.class.localeCompare(b.class) 
                                        || a.name.localeCompare(b.name);
                            });
                            thisMap.set(currentDay, currExamArr);
                            setExamMap(thisMap);
                        }
                        setEditExamObject(null);
                        setExamEventBoxClicked(false)
                    }}
                    onDelete={() => {
                        let thisMap = hashMap(localStorage.exam);
                        let currExamArr = thisMap.get(currentDay);
                        removeEvent(currExamArr, editExamObject);
                        setDeleteMap(thisMap, currExamArr, currentDay);
                        setExamMap(thisMap);
                        setEditExamObject(null);
                        setExamEventBoxClicked(false);
                        
                    }}
                />    
            }

            {
                assignmentEventBoxClicked &&
                <DeleteAssignmentEventModal
                    assignment={editAssignmentObject}
                    onSave={(assignmentName, className, deadline, isCompletedValue) => {
                        let thisMap = hashMap(localStorage.assignment);
                        let assignmentEventObject = {
                            name: assignmentName,
                            class: className,
                            time: timeValue(deadline),
                            timeMeridian: deadline,
                            isCompleted: !isCompletedValue
                        }
                        let currAssignmentArr = thisMap.get(currentDay);
                        if (JSON.stringify(editAssignmentObject) != JSON.stringify(assignmentEventObject)) {
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
                        let thisMap = hashMap(localStorage.assignment);
                        let currAssignmentArr = thisMap.get(currentDay);
                        removeEvent(currAssignmentArr, editAssignmentObject);
                        setDeleteMap(thisMap, currAssignmentArr, currentDay);
                        setAssignmentMap(thisMap);
                        setEditAssignmentObject(null);
                        setAssignmentEventBoxClicked(false);
                    }}
                />    
            }
        </>
    );
};