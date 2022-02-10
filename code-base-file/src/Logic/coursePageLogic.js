import { getDatabase, ref, onValue, set} from "firebase/database";

export function doesClassOverlap() {
    return (startTimeOld, endTimeOld, startTimeNew, endTimeNew) => {
        let stOld = new Date("01/01/2000 " + startTimeOld);
        let etOld = new Date("01/01/2000 " + endTimeOld);
        let stNew = new Date("01/01/2000 " + startTimeNew);
        let etNew = new Date("01/01/2000 " + endTimeNew);
        return ((etOld <= etNew && etOld >= stNew) || (stNew <= etOld && stNew >= stOld));
    };
}

export function validateCourseAdditions(potentialCourses, setPotentialCourses, setOverlapErrors) {
    return (course) => {
        let coursesToAdd = [...potentialCourses];
        for (let courseName in potentialCourses) {
            if (course === potentialCourses[courseName]) {
                coursesToAdd.splice(0, 2);
                setPotentialCourses(coursesToAdd);
                setOverlapErrors("Successfully removed all of your sections.");
                return;
            }
        }

        if (potentialCourses.length === 0) {
            if (course.sectionName.length === 1) {
                coursesToAdd.push(course);
                setOverlapErrors("");
            } else {
                setOverlapErrors("Section " + course.sectionName + " is not a lecture. Please add a lecture before adding a section!");
            }
        } else if (potentialCourses.length === 1) {
            if (course.sectionName.length === 2 && course.sectionName.charAt(0) === potentialCourses[0].sectionName.charAt(0)) {
                coursesToAdd.push(course);
                setOverlapErrors("");
            } else {
                setOverlapErrors("Section " + course.sectionName + " is not a corresponding section. Please add a section that starts with the same class code as your lecture!");
            }
        } else {
            setOverlapErrors("You have added the maximum amount of sections. Please click your selected section to remove if you would like to change your selection.");
        }
        setPotentialCourses(coursesToAdd);
    };
}

export function setOverlapErrorMessage(setOverlapErrors) {
    return (sectionName) => {
        if (sectionName.length <= 2) {
            sectionName = "You can not add section " + sectionName + " because it overlaps with your schedule.";
        }
        setOverlapErrors(sectionName);
    };
}

export function checkForOverlappingClasses(OVERLAPS) {
    return (nameCode) => {
        for (let i = 0; i < OVERLAPS.length; i++) {
            if (OVERLAPS[i] === nameCode) {
                return true;
            }
        }
        return false;
    };
}

export function handleClassRegistration(schedule, course, setSchedule) {
    const db = getDatabase();

    return (courseArr) => {
        let newSchedule = [...schedule];
        let newCourse = {
            "department": course.department,
            "number": course.number,
            "credits": course.credits,
            "genEd": course.genEd,
            "sections": []
        };
        for (let i = 0; i < courseArr.length; i++) {
            newCourse.sections.push({
                "sectionName": courseArr[i].sectionName,
                "instructorFName": courseArr[i].instructorFName,
                "instructorLName": courseArr[i].instructorLName,
                "classType": courseArr[i].classType,
                "room": courseArr[i].room,
                "schedule": courseArr[i].schedule
            });
        }
        newSchedule.push(newCourse);
        setSchedule(newSchedule);
        set(ref(db, 'student/schedule'), newSchedule);
    };
}
