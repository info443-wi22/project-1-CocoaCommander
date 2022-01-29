export function deleteCourses(dataRef, setWaitlistData) {
    let coursesRef = dataRef;
    console.log(coursesRef);
    setWaitlistData([]);
    coursesRef.remove();
}