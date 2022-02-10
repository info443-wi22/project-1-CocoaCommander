import React from 'react';
import WaitlistSectionDetail from './WaitlistSectionDetail';
import { getScheduleDay } from '../../Logic/waitlistPageLogic';

const WaitlistCourseSections = ({
    waitlist,
    course,
    dataRef,
    setWaitlistData
}) => {
    let courseName = course.department + " " + course.number + " (" + course.credits + ")";
    return course.courseSections.map((section, i) => {
        let schedule = getScheduleDay(section)
        return (
            <WaitlistSectionDetail courseName={courseName} section={section} schedule={schedule} setWaitlistData={setWaitlistData} dataRef={dataRef} waitlist={waitlist} key={i}/>
        );
    });
}

export default WaitlistCourseSections;