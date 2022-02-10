import React from 'react';
import { deleteCourses } from '../../Logic/waitlistPageLogic';

const WaitlistSectionDetail = ({
    courseNameAndCredits,
    section,
    dayOfCourse,
    props,
    index
}) => {

    return (
        <tr>
            <td>
                <h4>{courseNameAndCredits}</h4>
            </td>
            <td><h4>{section.sectionName}</h4></td>
            <td>{section.classType}</td>
            <td>{section.room}</td>
            <td>{dayOfCourse}</td>
            <td>{section.schedule[index].startTime + ' - ' + section.schedule[index].endTime}</td>
            <td>{"Pending"}</td>
            <td>
                <i className="fa fa-trash" onClick={deleteCourses(props.setWaitlistData, props.dataRef, props.waitlist)}></i>
            </td>
        </tr>
    );
}

export default WaitlistSectionDetail;