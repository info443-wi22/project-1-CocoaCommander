import React from 'react';
import WaitlistSectionDetail from './WaitlistSectionDetail';

export function WaitlistCourseSections(props) {
    let course = props.course;
    console.log(course);
    let courseName = course.department + " " + course.number + " (" + course.credits + ")";
    return course.courseSections.map((section) => {
        let schedule = getScheduleDay(section)
        return (
            <WaitlistSectionDetail courseName={courseName} section={section} schedule={schedule} setWaitlistData={props.setWaitlistData} dataRef={props.dataRef}/>
        );
    });
}

export function getScheduleDay(section) {
    let schedule = "";
    for (let j = 0; j < section.schedule.length; j++) {
        switch (section.schedule[j].day) {
            case "Thursday":
                schedule += section.schedule[j].day.substring(0, 2);
                break;
            case "Saturday":
                schedule += section.schedule[j].day.substring(0, 2);
                break;
            default:
                schedule += section.schedule[j].day.charAt(0);
        }
    }
    return schedule;
}
