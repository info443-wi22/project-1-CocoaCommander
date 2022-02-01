import React from 'react';
import WaitlistSectionDetail from './WaitlistSectionDetail';
import { getScheduleDay } from '../../Logic/waitlistPageLogic';

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

export default WaitlistCourseSections;