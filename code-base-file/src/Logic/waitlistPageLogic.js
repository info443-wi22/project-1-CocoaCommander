import { useEffect } from "react";

export function deleteCourses(setWaitlistData, dataRef, waitlist) {
    let coursesRef = dataRef;
    useEffect(() => {
        setWaitlistData([]);
    }, [waitlist])
    // setWaitlistData([]);
    // coursesRef.remove();
}