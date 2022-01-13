import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
import schedule from './schedule.png';

function AboutCoursePage(props) {
    return (
        <div className="section">
            <h2 className="courseHeading">About Course Page</h2>
            <hr/>
            <p>
                This is an implementation of a version of the UW student registration system that includes a waitlist. 
                To use this site, click on the plus icon to join that section's waitlist if there are no spots left in the class.
                Please note that you must add both a lab and a lecture in order to sign up for the waitlist.
                You also can not add any classes that overlap with your schedule.
                Additionally, you must click the register button twice for the application to work.
                It is unclear why this is the case, but it has been a very long quarter and we think that
                the work we did is close enough to call it a day.
                For reference, the schedule of the example student looks like this:
            </p>
            <img src={schedule} alt="the example schedule" className="scheduleImg"></img>
            <p>
                To remove courses, click the trash icon on the waitlist page. 
                Removing a course will remove all the courses because you can not register for
                a class without both having a lecture and a lab lined up. It is worth noting that there
                are some flaws with this logic, but for now, we want to focus on taking the load
                off of the extremely heavily impacted courses such as INFO 200 and CSE 373, which will most
                likely have their lectures AND their labs/quiz sections full.
            </p>
        </div>
    );
}

export default AboutCoursePage;