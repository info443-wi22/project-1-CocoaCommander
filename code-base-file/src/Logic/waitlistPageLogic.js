import { useEffect } from "react";

export function deleteCourses(setWaitlistData, dataRef, waitlist) {
    let coursesRef = dataRef;
    console.log(coursesRef);
    useEffect(() => {
        setWaitlistData([]);
    }, [waitlist])
    // setWaitlistData([]);
    // coursesRef.remove();
}