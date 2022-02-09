import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import firebase from 'firebase/app';
import { getDatabase, ref, onValue} from "firebase/database";
import WaitlistCourses from '../Components/waitlistPage/WaitlistCourses';

const WaitlistPage = ({
    student,
}) => {
    // //extract courses from firebase
    const db = getDatabase();
    let dataRef = ref(db, 'student/schedule');

    let data = student.waitlist;
    // let data = [];
    // // onValue(dataRef, (snapshot) => {
    // //     data = snapshot.val();
    // //   });

    const [waitlistData, setWaitlistData] = useState(data);

    return (
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
    );
}

export default WaitlistPage;