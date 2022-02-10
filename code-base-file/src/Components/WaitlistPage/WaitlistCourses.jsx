import React from 'react';
// import { deleteCourses} from '../../Logic/waitlistPageLogic';
import WaitlistCourseSections from './WaitlistCourseSections';
import 'font-awesome/css/font-awesome.min.css';

const WaitlistCourses = props => {
    let toDisplay = [];

    toDisplay = props.waitlist.map((course, i) => {
        return (
            <WaitlistCourseSections course={course} key={i} props={props}/>
        )
    });

    const WaitListCourseSectionWrapper = ({
        body
    }) => {
        return (
            <table className="table table-hover courseTable waitlistTable">
                <tbody>
                    {body}
                </tbody>
            </table>
        )
    }

    return (
        <div className="section">
            {
            props.waitlist.length === 0 ? 
            "You aren't on the waitlist for any classes yet! (You need to click the register button twice.)" : 
            <WaitListCourseSectionWrapper body={toDisplay} />
            }
        </div>
    );
}

export default WaitlistCourses;