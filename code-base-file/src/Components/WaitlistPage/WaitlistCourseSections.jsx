import React from 'react';
import WaitlistSectionDetail from './WaitlistSectionDetail';
import { getScheduleDay } from '../../Logic/waitlistPageLogic';

const WaitlistCourseSections = ({
    course,
    props
}) => {
    let courseNameAndCredits = course.department + " " + course.number + " (" + course.credits + ")";
    return course.courseSections.map((section, i) => {
        let dayOfCourse = getScheduleDay(section)
        return (
            <WaitlistSectionDetail courseNameAndCredits={courseNameAndCredits} section={section} dayOfCourse={dayOfCourse} props={props} index={i} key={i}/>
        );
    });
}

export default WaitlistCourseSections;