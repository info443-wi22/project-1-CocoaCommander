import React from 'react';
import WaitlistSectionDetail from './WaitlistSectionDetail';

const WaitlistCourseSections = (props) => {
    let course = props.course;
    let courseName = course.department + " " + course.number + " (" + course.credits + ")";
    return course.courseSections.map((section, i) => {
        let schedule = getScheduleDay(section)
        return (
            <WaitlistSectionDetail courseName={courseName} section={section} schedule={schedule} setWaitlistData={props.setWaitlistData} dataRef={props.dataRef} waitlist={props.waitlist} key={i}/>
        );
    });
}

function getScheduleDay(section) {
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

export default WaitlistCourseSections;