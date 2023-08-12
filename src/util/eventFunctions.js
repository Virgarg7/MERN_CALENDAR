import React from "react";
import { hashMap } from "../util/hashFunctions"

export const timeValue = (timeMeridian => {
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

export const eventInMap = ((hashMap, eventObj, day) => {
    let equal = false;
    hashMap.get(day).forEach(event => {
        if (JSON.stringify(event) == JSON.stringify(eventObj)) {
            equal = true;
        }
    });
    return equal;
});

export const removeEvent = ((arr, eventObj) => {
    let index = -1;
    for (let i = 0; i < arr.length; i++) {
        if (JSON.stringify(arr[i]) == JSON.stringify(eventObj)) {
            index = i;
        }
    }
    arr.splice(index, 1);
});

export const setDeleteMap = ((hashMap, arr, day) => {
    if (arr.length == 0) {
        hashMap.delete(day);
    } else {
        hashMap.set(day, arr);
    }
});

export const scheduleObj = ((className, classType, classTime, classLocation, isCompleted) => {
    return {
        name: className,
        type: classType,
        time: timeValue(classTime),
        timeMeridian: classTime,
        location: classLocation,
        isCompleted: isCompleted
    }
});

export const examObj = ((examName, className, examTime, examLocation, isCompleted) => {
    return {
        name: examName,
        class: className,
        time: timeValue(examTime),
        timeMeridian: examTime,
        location: examLocation,
        isCompleted: isCompleted
    }
});

export const assignmentObj = ((assignmentName, className, deadline, isCompleted) => {
    return {
        name: assignmentName,
        class: className,
        time: timeValue(deadline),
        timeMeridian: deadline,
        isCompleted: isCompleted
    }
})

export const pushExamOrAssignment = ((arr, eventObj, hashMap, day) => {
    arr.push(eventObj);
    arr.sort((a, b) => {
        return a.time - b.time 
            || a.class.localeCompare(b.class) 
                || a.name.localeCompare(b.name);
    });
    hashMap.set(day, arr);
});

export const pushSchedule = ((arr, eventObj, hashMap, day) => {
    arr.push(eventObj);
    arr.sort((a, b) => {
        return a.time - b.time 
            || (a.name).localeCompare(b.name) 
                || (a.type).localeCompare(b.type);
    });
    hashMap.set(day, arr);
});

export const addEvent = ((hashMap, day, eventObj) => {
    if (hashMap.get(day)) {
        if (!(eventInMap(hashMap, eventObj, day))) {
            pushSchedule(hashMap.get(day), eventObj, hashMap, day);
        }              
    } else {
        hashMap.set(day, [eventObj]);
    }
});

export const addedHashMap = ((storageType, day, eventObj) => {
    let thisMap = hashMap(storageType);
    addEvent(thisMap, day, eventObj);
    return thisMap;
})

export const removedHashMap = ((storageType, day, eventObj) => {
    let thisMap = hashMap(storageType);
    let currAssignmentArr = thisMap.get(day);
    removeEvent(currAssignmentArr, eventObj);
    setDeleteMap(thisMap, currAssignmentArr, day);
    return thisMap;
})

export const editedHashMap = ((storageType, day, oldEventObj, newEventObj) => {
    let thisMap = hashMap(storageType);
    let currScheduleArr = thisMap.get(day);

    removeEvent(currScheduleArr, oldEventObj);
    pushSchedule(currScheduleArr, newEventObj, thisMap, day);
    
    return JSON.stringify(oldEventObj) != JSON.stringify(newEventObj) 
        ? thisMap
        : hashMap(storageType);
});

export const completedHashMap = ((storageType, completedObj, day) => {
    let thisMap = hashMap(storageType);
    thisMap.get(day).forEach((obj) => {
        if (JSON.stringify(obj) == JSON.stringify(completedObj)) {
            obj.isCompleted = (obj.isCompleted == false) ? true : false;
        }
    })
    return thisMap;
});


