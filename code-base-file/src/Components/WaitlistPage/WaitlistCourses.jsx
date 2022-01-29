import React from 'react';
import { deleteCourses} from '../../Logic/waitlistPageLogic';
import WaitlistCourseSections from './WaitlistCourseSections';
import 'font-awesome/css/font-awesome.min.css';

export function WaitlistCourses(props) {
    let waitlist = props.waitlist;
    let toDisplay = [];

    for (let i = 0; i < waitlist.length; i++) {
        let course = waitlist[i];
        toDisplay.push(<WaitlistCourseSections course={course} dataRef={props.dataRef}/>)
    }

    return (
        <div className="section">
            {toDisplay.length === 0 ? "You aren't on the waitlist for any classes yet! (You need to click the register button twice.)" : `${
            <table className="table table-hover courseTable waitlistTable">
                <tbody>
                    {toDisplay}
                </tbody>
            </table>
            }`}

        </div>
    );
}
