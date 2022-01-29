import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import firebase from 'firebase/app';
import { getDatabase, ref, onValue} from "firebase/database";

function WaitlistPage() {
     const db = getDatabase();

    //extract courses from firebase
    let dataRef = ref(db, 'student/schedule');
    let data = [];

    onValue(dataRef, (snapshot) => {
        data = snapshot.val();
      });

    const [waitlistData, setWaitlistData] = useState(data);


    return(
        <div>
            <div className="section">
                <h2 className="courseHeading">Waitlist</h2>
                <hr/>
                <p>Check what you've registered for on the waitlist and their statuses here.
                    You can click the trash button to delete the main section and section of a class.
                </p>
            </div>
            <WaitlistCourses waitlist={waitlistData} setWaitlistData={setWaitlistData} dataRef={dataRef}/>

        </div>
    )
}

function deleteCourses(props) {
    let coursesRef = props.dataRef;
    console.log(coursesRef);
    props.setWaitlistData([]);
    coursesRef.remove();
}

function WaitlistCourses(props) {

    let waitlist = props.waitlist
    let toDisplay = [];

    // let deleteCourses = () => {
    //     let coursesRef = props.dataRef;
    //     props.setWaitlistData([]);
    //     coursesRef.remove();
    // }
    
    if (waitlist !== null) {
        for (let i = 0; i < waitlist.length; i++) {
            let course = waitlist[i];
            let courseName = course.department + " " + course.number + " (" + course.credits +")";
            if (course.sections !== undefined) {
                toDisplay = course.sections.map((section) => {
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
                                <i className="fa fa-trash" onClick={deleteCourses(setWaitlistData=props.setWaitlistData,dataRef=props.dataRef)}></i>
                            </td>
                        </tr>
                    );
                });
            }
        }
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

export default WaitlistPage;