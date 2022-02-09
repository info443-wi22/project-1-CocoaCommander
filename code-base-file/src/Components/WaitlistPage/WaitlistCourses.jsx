import React from 'react';
import { deleteCourses} from '../../Logic/waitlistPageLogic';
import WaitlistCourseSections from './WaitlistCourseSections';
import 'font-awesome/css/font-awesome.min.css';

const WaitlistCourses = ({
    waitlist, 
    setWaitlistData,
    dataRef
}) => {
    let toDisplay = [];

    // for (let i = 0; i < waitlist.length; i++) {
    //     let course = waitlist[i];
    //     toDisplay.push(<WaitlistCourseSections course={course} dataRef={props.dataRef}/>)
    // }

    toDisplay = waitlist.map((course, i) => {
        return (
            <WaitlistCourseSections waitlist={waitlist} course={course} dataRef={dataRef} setWaitlistData={setWaitlistData} key={i} />
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
            waitlist.length === 0 ? 
            "You aren't on the waitlist for any classes yet! (You need to click the register button twice.)" : 
            <WaitListCourseSectionWrapper body={toDisplay} />
            }
        </div>
    );
}

export default WaitlistCourses;