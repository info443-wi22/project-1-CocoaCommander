import React from 'react';
import { deleteCourses} from '../../Logic/waitlistPageLogic';

const WaitlistSectionDetail = (props) => {
    let courseName = props.courseName;
    let section = props.section;
    let schedule = props.schedule;
    const setWaitlistData = props.setWaitlistData;
    const dataRef = props.dataRef;
    const waitlist = props.waitlist;

    return (
        <tr>
            <td>
                <h4>{courseName}</h4>
            </td>
            <td><h4>{section.sectionName}</h4></td>
            <td>{section.classType}</td>
            <td>{section.room}</td>
            <td>{schedule}</td>
            <td>{section.schedule[0].startTime + ' - ' + section.schedule[0].endTime}</td>
            <td>{"Pending"}</td>
            <td>
                <i className="fa fa-trash" onClick={deleteCourses(setWaitlistData, dataRef, waitlist)}></i>
            </td>
        </tr>
    );
}

export default WaitlistSectionDetail;