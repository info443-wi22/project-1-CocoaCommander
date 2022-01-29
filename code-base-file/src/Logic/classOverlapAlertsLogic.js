export function checkCurrentScheduleForOverlapsWithGivenCourse(classList, courseData, illegalClass, OVERLAPS) {
    let overlapMsgArr = [];
    checkEachCourseInStudentClassListForOverlaps(classList, courseData, illegalClass, overlapMsgArr, OVERLAPS);
    return overlapMsgArr;
}
export function checkEachCourseInStudentClassListForOverlaps(classList, courseData, illegalClass, overlapMsgArr, OVERLAPS) {
    for (let course in classList) {
        let dept = classList[course].department;
        let num = classList[course].number;
        let sectionsArr = classList[course].sections;
        checkEachSectionInACourseForOverlaps(sectionsArr, courseData, illegalClass, overlapMsgArr, dept, num, OVERLAPS);
    }
}
export function checkEachSectionInACourseForOverlaps(sectionsArr, courseData, illegalClass, overlapMsgArr, dept, num, OVERLAPS) {
    for (let section in sectionsArr) {
        let scheduleArr = sectionsArr[section].schedule;
        let studentCourseName = sectionsArr[section].sectionName;
        checkEachDayASectionOccursForOverlaps(scheduleArr, courseData, illegalClass, overlapMsgArr, dept, num, studentCourseName, OVERLAPS);
    }
}
export function checkEachDayASectionOccursForOverlaps(scheduleArr, courseData, illegalClass, overlapMsgArr, dept, num, studentCourseName, OVERLAPS) {
    for (let day in scheduleArr) {
        let oldDay = scheduleArr[day].day;

        checkIfGivenCourseHasOverlapsWithASpecificSection(courseData, scheduleArr, day, oldDay, illegalClass, overlapMsgArr, dept, num, studentCourseName, OVERLAPS);
    }
}
export function checkIfGivenCourseHasOverlapsWithASpecificSection(courseData, scheduleArr, day, oldDay, illegalClass, overlapMsgArr, dept, num, studentCourseName, OVERLAPS) {
    for (let mainSection in courseData) {
        let mainSectionScheduleArr = courseData[mainSection].schedule;
        let classType = courseData[mainSection].classType;
        let sectionName = courseData[mainSection].sectionName;
        let startOld = scheduleArr[day].startTime;
        let endOld = scheduleArr[day].endTime;

        checkIfGivenLectureHasOverlapsWithASpecificSection(mainSectionScheduleArr, oldDay, illegalClass, startOld, endOld, overlapMsgArr, dept, num, studentCourseName, classType, sectionName, OVERLAPS);

        let minorSectionArr = courseData[mainSection].sections;
        classType = checkIfGivenSectionOverlapsWithASpecificSection(minorSectionArr, classType, oldDay, illegalClass, startOld, endOld, overlapMsgArr, dept, num, studentCourseName, OVERLAPS);
    }
}
export function checkIfGivenSectionOverlapsWithASpecificSection(minorSectionArr, classType, oldDay, illegalClass, startOld, endOld, overlapMsgArr, dept, num, studentCourseName, OVERLAPS) {
    for (let minorSection in minorSectionArr) {
        let minorSectionScheduleArr = minorSectionArr[minorSection].schedule;
        classType = minorSectionArr[minorSection].classType;
        let minorSectionName = minorSectionArr[minorSection].sectionName;
        checkIfGivenDayOfSectionOverlapsWithTheDayOfASpecificSection(minorSectionScheduleArr, oldDay, illegalClass, startOld, endOld, overlapMsgArr, dept, num, studentCourseName, classType, minorSectionName, OVERLAPS);
    }
    return classType;
}
export function checkIfGivenDayOfSectionOverlapsWithTheDayOfASpecificSection(minorSectionScheduleArr, oldDay, illegalClass, startOld, endOld, overlapMsgArr, dept, num, studentCourseName, classType, minorSectionName, OVERLAPS) {
    for (let minorDay in minorSectionScheduleArr) {
        let newDay = minorSectionScheduleArr[minorDay].day;
        checkIfGivenDayOfSectionIsTheSameDayAsASpecificSection(oldDay, newDay, minorSectionScheduleArr, minorDay, illegalClass, startOld, endOld, overlapMsgArr, dept, num, studentCourseName, classType, minorSectionName, OVERLAPS);
    }
}
export function checkIfGivenDayOfSectionIsTheSameDayAsASpecificSection(oldDay, newDay, minorSectionScheduleArr, minorDay, illegalClass, startOld, endOld, overlapMsgArr, dept, num, studentCourseName, classType, minorSectionName, OVERLAPS) {
    if (oldDay === newDay) {
        let startNew = minorSectionScheduleArr[minorDay].startTime;
        let endNew = minorSectionScheduleArr[minorDay].endTime;
        checkIfGivenTimeOfSectionOverlapsWithASpecificSection(illegalClass, startOld, endOld, startNew, endNew, overlapMsgArr, dept, num, studentCourseName, classType, minorSectionName, oldDay, OVERLAPS);
    }
}
export function checkIfGivenTimeOfSectionOverlapsWithASpecificSection(illegalClass, startOld, endOld, startNew, endNew, overlapMsgArr, dept, num, studentCourseName, classType, minorSectionName, oldDay, OVERLAPS) {
    if (illegalClass(startOld, endOld, startNew, endNew)) {
        overlapMsgArr.push(
            "Your class " + dept + " " + num + " " + studentCourseName + " overlaps with " + classType + " section " + minorSectionName + " on " + oldDay + ". "
        );
        OVERLAPS.push(minorSectionName);
    }
}
export function checkIfGivenLectureHasOverlapsWithASpecificSection(mainSectionScheduleArr, oldDay, illegalClass, startOld, endOld, overlapMsgArr, dept, num, studentCourseName, classType, sectionName, OVERLAPS) {
    for (let mainDay in mainSectionScheduleArr) {
        let newDay = mainSectionScheduleArr[mainDay].day;

        // check lecture times in this course against times in given student section
        checkIfAStudentsCurrentSectionInterferesWithALectureSection(oldDay, newDay, mainSectionScheduleArr, mainDay, illegalClass, startOld, endOld, overlapMsgArr, dept, num, studentCourseName, classType, sectionName, OVERLAPS);
    }
}
export function checkIfAStudentsCurrentSectionInterferesWithALectureSection(oldDay, newDay, mainSectionScheduleArr, mainDay, illegalClass, startOld, endOld, overlapMsgArr, dept, num, studentCourseName, classType, sectionName, OVERLAPS) {
    if (oldDay === newDay) {

        let startNew = mainSectionScheduleArr[mainDay].startTime;
        let endNew = mainSectionScheduleArr[mainDay].endTime;
        checkIfAStudentsCurrenSectionTimeInterferesWithALectureSectionTime(illegalClass, startOld, endOld, startNew, endNew, overlapMsgArr, dept, num, studentCourseName, classType, sectionName, oldDay, OVERLAPS);
    }
}
export function checkIfAStudentsCurrenSectionTimeInterferesWithALectureSectionTime(illegalClass, startOld, endOld, startNew, endNew, overlapMsgArr, dept, num, studentCourseName, classType, sectionName, oldDay, OVERLAPS) {
    if (illegalClass(startOld, endOld, startNew, endNew)) {
        overlapMsgArr.push(
            "Your class " + dept + " " + num + " " + studentCourseName + " overlaps with " + classType + " section " + sectionName + " on " + oldDay + ". "
        );
        OVERLAPS.push(sectionName);
    }
}
