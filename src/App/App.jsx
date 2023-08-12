import React, { useState, useEffect } from "react";
import { CalendarHeader } from "../Components/CalendarHeader";
import { Day } from "../Components//Day"
import { NewScheduleEventModal } from "../Components/EventModals/ScheduleModals/NewScheduleEventModal";
import { NewExamEventModal } from "../Components/EventModals/ExamModals/NewExamEventModal";
import { NewAssignmentEventModal} from "../Components/EventModals/AssignmentModals/NewAssignmentEventModal";
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
import { useDate } from "../Hooks/useDate";
import { hashMap, setHashMap } from "../util/hashFunctions"
import { scheduleObj, examObj, assignmentObj, addedHashMap, removedHashMap, editedHashMap, completedHashMap} from "../util/eventFunctions"


export const App = () => {

    const dtToday = new Date();
    const today = `${dtToday.getMonth() + 1}/${dtToday.getDate()}/${dtToday.getFullYear()}`;
    const [dayNav, setDayNav] = useState(0);

    const [nav, setNav] = useState(0);
    const [currentDay, setCurrentDay] = useState(today);

    const [scheduleBoxClicked, setScheduleBoxClicked] = useState(false);
    const [examBoxClicked, setExamBoxClicked] = useState(false);
    const [assignmentBoxClicked, setAssignmentBoxClicked] = useState(false);

    const [assignmentEventBoxClicked, setAssignmentEventBoxClicked] = useState(false);
    const [examEventBoxClicked, setExamEventBoxClicked] = useState(false);
    const [scheduleEventBoxClicked, setScheduleEventBoxClicked] = useState(false);

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

    localStorage.schedule = setHashMap(scheduleMap);
    localStorage.exam = setHashMap(examMap);
    localStorage.assignment = setHashMap(assignmentMap);
    
    const [schedules, setSchedules] = useState(() => {
        let thisMap = hashMap(localStorage.schedule);
        return thisMap.get(currentDay);
    })
    const [exams, setExams] = useState(() => {
        let thisMap = hashMap(localStorage.exam);
        return thisMap.get(currentDay);
    })
    const [assignments, setAssignments] = useState(() => {
        let thisMap = hashMap(localStorage.assignment);
        return thisMap.get(currentDay);
    });

    const [completedScheduleObject, setCompletedScheduleObject] = useState();
    const [completedExamObject, setCompletedExamObject] = useState();
    const [completedAssignmentObject, setCompletedAssignmentObject] = useState();
    
    const [editScheduleObject, setEditScheduleObject] = useState();
    const [editExamObject, setEditExamObject] = useState();
    const [editAssignmentObject, setEditAssignmentObject] = useState();
    
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
    
    useEffect(() => {
        localStorage.schedule = setHashMap(scheduleMap);
    }, [scheduleMap]);

    useEffect(() => {
        localStorage.exam = setHashMap(examMap);
    }, [examMap]);

    useEffect(() => {
        localStorage.assignment = setHashMap(assignmentMap);
    }, [assignmentMap]);

    useEffect(() => {
        let scheduleCurrentMap = hashMap(localStorage.schedule);
        setSchedules(scheduleCurrentMap.get(currentDay));
    }, [currentDay, scheduleMap]);

    useEffect(() => {
        let examCurrentMap = hashMap(localStorage.exam);
        setExams(examCurrentMap.get(currentDay));
    }, [currentDay, examMap]);
    
    useEffect(() => {
        let assignmentCurrentMap = hashMap(localStorage.assignment);
        setAssignments(assignmentCurrentMap.get(currentDay));
    }, [currentDay, assignmentMap]);

    useEffect(() => {
        if (completedScheduleObject) {
            setScheduleMap(completedHashMap(localStorage.schedule, completedScheduleObject, currentDay));
        }
    }, [completedScheduleObject]);

    useEffect(() => {
        if (completedExamObject) {
            setExamMap(completedHashMap(localStorage.exam, completedExamObject, currentDay));
        }
    }, [completedExamObject]);

    useEffect(() => {
        if (completedAssignmentObject) {
            setAssignmentMap(completedHashMap(localStorage.assignment, completedAssignmentObject, currentDay));
        }
    }, [completedAssignmentObject]);

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
                                onSave={event => {
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
                                onClick={() => {
                                    setCompletedAssignmentObject(a);
                                }}
                                onSave={() => {
                                    setAssignmentEventBoxClicked(true);
                                    setEditAssignmentObject(a);
                                }}
                                onDelete={() => {
                                    setEditAssignmentObject(a);
                                    setAssignmentMap(removedHashMap(localStorage.assignment, currentDay,
                                        editAssignmentObject));
                                    setEditAssignmentObject(null);
                                    setAssignmentEventBoxClicked(false);
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
                        setScheduleMap(addedHashMap(localStorage.schedule, currentDay,
                            scheduleObj(className, classType, classTime, classLocation, false)));
                        setScheduleBoxClicked(false);
                    }}
                />
            }

            {
                examBoxClicked && 
                < NewExamEventModal
                    onClose={() => setExamBoxClicked(false)} 
                    onSave={(examName, className, examTime, examLocation) => {
                        setExamMap(addedHashMap(localStorage.exam, currentDay, 
                            examObj(examName, className, examTime, examLocation, false)));
                        setExamBoxClicked(false);
                    }}
                />
            }

            {
                assignmentBoxClicked && 
                < NewAssignmentEventModal
                    onClose={() => setAssignmentBoxClicked(false)} 
                    onSave={(assignmentName, className, deadline) => {
                        setAssignmentMap(addedHashMap(localStorage.assignment, currentDay, 
                            assignmentObj(assignmentName, className, deadline, false)));
                        setAssignmentBoxClicked(false);
                    }}
                />
            }

            {
                scheduleEventBoxClicked &&
                <DeleteScheduleEventModal
                    schedule={editScheduleObject}
                    onSave={(className, classType, classTime, classLocation, isCompletedValue) => {
                        setScheduleMap(editedHashMap(localStorage.schedule, currentDay,
                            editScheduleObject, 
                                scheduleObj(className, classType, classTime, 
                                    classLocation, isCompletedValue)));
                        setEditScheduleObject(null);
                        setScheduleEventBoxClicked(false)
                    }}
                    onDelete={() => {
                        setScheduleMap(removedHashMap(localStorage.schedule, currentDay, 
                            editScheduleObject));
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
                        setExamMap(editedHashMap(localStorage.exam, currentDay, 
                            editExamObject, 
                                examObj(examName, className, 
                                    examTime, examLocation, isCompletedValue)));
                        setEditExamObject(null);
                        setExamEventBoxClicked(false)
                    }}
                    onDelete={() => {
                        setExamMap(removedHashMap(localStorage.exam, currentDay, 
                            editExamObject));
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
                        setAssignmentMap(editedHashMap(localStorage.assignment, currentDay, 
                            editAssignmentObject, 
                                assignmentObj(assignmentName, className, 
                                    deadline, isCompletedValue)));
                        setEditAssignmentObject(null);
                        setAssignmentEventBoxClicked(false);
                    }}
                    onClose={() => {
                        setEditAssignmentObject(null);
                        setAssignmentEventBoxClicked(false);
                    }}
                />    
            }
        </>
    );
};