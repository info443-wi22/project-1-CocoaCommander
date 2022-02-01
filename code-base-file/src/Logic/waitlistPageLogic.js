import { useEffect } from "react";
import { getDatabase, ref, onValue, set} from "firebase/database";

export function deleteCourses(setWaitlistData, dataRef, waitlist) {
    
    let coursesRef = dataRef;
    console.log(coursesRef);
    useEffect(() => {
        setWaitlistData([]);
        set(coursesRef, []);

    }, [waitlist])
    // set(coursesRef, []);
    // setWaitlistData([]);
    // coursesRef.remove();
}

export function getScheduleDay(section) {
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
    return schedule;
}