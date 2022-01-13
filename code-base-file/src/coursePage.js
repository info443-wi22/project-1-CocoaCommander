import { Button, Alert } from 'reactstrap';
import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { Link } from "react-router-dom";
import firebase from 'firebase/app';

function CoursePage(props) {
    let student = props.props.student;
    let course = props.props.course;

    const [schedule, setSchedule] = useState(student.waitlist);
    const OVERLAPS = [];
    const [overlapErrors, setOverlapErrors] = useState("");
    const [potentialCourses, setPotentialCourses] = useState([]);
    
    let handleReg = (courseArr) => {
        let newSchedule = [...schedule];
        let newCourse = {
            "department": course.department,
            "number": course.number,
            "credits": course.credits,
            "genEd": course.genEd,
            "sections": []
        }
        for (let i = 0; i < courseArr.length; i++) {
            newCourse.sections.push({
                "sectionName": courseArr[i].sectionName, 
                "instructorFName": courseArr[i].instructorFName,
                "instructorLName": courseArr[i].instructorLName,
                "classType": courseArr[i].classType,
                "room": courseArr[i].room,
                "schedule": courseArr[i].schedule
            })
        }
        newSchedule.push(newCourse);
        setSchedule(newSchedule);
    }

    let cantAdd = (nameCode) => {
        for (let i = 0; i < OVERLAPS.length; i++) {
            if (OVERLAPS[i] === nameCode) {
                return true;
            }
        }
        return false;
    }

    let handleOverlapErrors = (sectionName) => {
        if (sectionName.length <= 2) {
            sectionName = "You can not add section " + sectionName + " because it overlaps with your schedule."
        }
        setOverlapErrors(sectionName);
    }

    let handleCourseAdd = (course) => {
        let coursesToAdd = [...potentialCourses];

        // If you've already selected the course, remove and exit
        for (let courseName in potentialCourses) {
            if (course === potentialCourses[courseName]) {
                coursesToAdd.splice(0, 2);
                setPotentialCourses(coursesToAdd);
                // message that says successfully removed section courseName
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
            setOverlapErrors("You have added the maximum amount of sections. Please click your selected section to remove if you would like to change your selection.")
        }
        setPotentialCourses(coursesToAdd);
    }

    let illegalClass = (startTimeOld, endTimeOld, startTimeNew, endTimeNew) => {
        let stOld = new Date("01/01/2000 " + startTimeOld);
        let etOld = new Date("01/01/2000 " + endTimeOld);
        let stNew = new Date("01/01/2000 " + startTimeNew);
        let etNew = new Date("01/01/2000 " + endTimeNew);
        return ((etOld <= etNew && etOld >= stNew) || (stNew <= etOld && stNew >= stOld));
    };

    return(
        <div>
            <CourseOverview course={course}/>
            <ClassOverlap 
                // classList is an Array of all the class sections a student has registered for
                classList={student.classList} 
                // courseData is an Array of all the sections in a course
                courseData={course.courseSections} 
                illegalClass={illegalClass}
                OVERLAPS={OVERLAPS}
            />
            <SectionOverlapErrors 
                overlapErrors={overlapErrors} 
            />
            <CoursesToAdd potentialCourses={potentialCourses}/>
            <CourseSectionsList 
                courseSections={course.courseSections} 
                handleReg={handleReg} 
                course={course}
                cantAdd={cantAdd}
                handleOverlapErrors={handleOverlapErrors}
                handleCourseAdd={handleCourseAdd}
            />
            <RegisterPotentialClasses potentialCourses={potentialCourses} handleReg={handleReg} schedule={schedule}/>
        </div>
    );
}


// here's where we set the waitlist to whatever's on the waitlist (any class that we've added that doesn't overlap)
// props.potential courses is an array of what the user has requested to add to their waitlist
// handle reg puts those classes in a good format to put into the example student
function RegisterPotentialClasses(props) {
    const [dNone, setdNone] = useState("d-none");
    const [color, setColor] = useState("danger");
    const [msg, setMsg] = useState("");
    const [clickAlready, setCLickAlready] = useState(false);
    let onClickReg = () => {
        setdNone("");
        if (props.potentialCourses.length === 0) {
            setMsg("You still need to add a lecture and a lab.");
        } else if (props.potentialCourses.length === 1) {
            setMsg("You still need to add a lab.");
        } else {
            props.handleReg(props.potentialCourses);
            
            firebase.database().ref('student').set({
                schedule: props.schedule
            });

            if (!clickAlready) {
                setColor("warning");
                setMsg("Please click again to fully register.");
                setCLickAlready(true);
            } else {
                setColor("success");
                setMsg("Successfully registered!");
            }
        }
    }

    return (
        <div>
            <Button color="primary" onClick={onClickReg}>
                Register for waitlists
            </Button>
            <Alert color={color} className={dNone}>
                {msg}
            </Alert>
        </div>

    );
}

function CoursesToAdd(props) {
    let dataToDisplay = props.potentialCourses.map((course) => {
        return (
            <Alert color="success">
                You are about to register for the section {course.sectionName} waitlist.
            </Alert>
        );
    });
    return (
        <div>
            {dataToDisplay}
        </div>
    );
}

function SectionOverlapErrors(props) {
    let noErrors = "";
    let color = "danger";
    if (props.overlapErrors.length === 0) {
        noErrors = "d-none ";
    }
    if (props.overlapErrors === "Successfully removed all of your sections.") {
        color = "success";
    }
    return (
        <Alert color={color} className={noErrors} role="alert">
            {props.overlapErrors}
        </Alert> 
    );
}

function ClassOverlap(props) {
    let illegalClass = props.illegalClass;
    let classList = props.classList;
    let courseData = props.courseData;
    let overlapMsgArr = [];
    const OVERLAPS = props.OVERLAPS;

    // for each lecture/lab bundle in student's class list
    // course is object at index course in classList[] which has property 'sections'
    for (let course in classList) {
        let dept = classList[course].department;
        let num = classList[course].number;
        let sectionsArr = classList[course].sections;
        // for each individual section in the lecture lab bundle
        // section is object at index section in sections[] with property 'schedule'
        for (let section in sectionsArr) {
            let scheduleArr = sectionsArr[section].schedule;
            let studentCourseName = sectionsArr[section].sectionName;
            // for each day object in the section (either lab or lecture)
            // day is object at index day in schedule[] with property 'day'
            for (let day in scheduleArr) {
                let oldDay = scheduleArr[day].day;
                
                // for each lecture/lab bundle in *this* course list
                // mainSection is object at index mainScetion in courseData[] with property 'schedule' 
                // contains lecture section on this level so we check lecture times against each other
                // we still need to look in mainSection.schedule to compare
                for (let mainSection in courseData) {
                    let mainSectionScheduleArr = courseData[mainSection].schedule;
                    let classType = courseData[mainSection].classType;
                    let sectionName = courseData[mainSection].sectionName;
                    let startOld = scheduleArr[day].startTime;
                    let endOld = scheduleArr[day].endTime;
                    
                    for (let mainDay in mainSectionScheduleArr) {
                        let newDay = mainSectionScheduleArr[mainDay].day;

                        // check lecture times in this course against times in given student section
                        if (oldDay === newDay) {

                            let startNew = mainSectionScheduleArr[mainDay].startTime;
                            let endNew = mainSectionScheduleArr[mainDay].endTime;
                            if (illegalClass(startOld, endOld, startNew, endNew)) {
                                overlapMsgArr.push(
                                    "Your class " + dept + " " + num + " " + studentCourseName + " overlaps with " + classType + " section " + sectionName + " on " + oldDay + ". "
                                );
                                OVERLAPS.push(sectionName);
                            }
                        }   
                    }
                    
                    let minorSectionArr = courseData[mainSection].sections;
                    for (let minorSection in minorSectionArr) {
                        let minorSectionScheduleArr = minorSectionArr[minorSection].schedule;
                        classType = minorSectionArr[minorSection].classType;
                        let minorSectionName = minorSectionArr[minorSection].sectionName;
                        for (let minorDay in minorSectionScheduleArr) {
                            let newDay = minorSectionScheduleArr[minorDay].day;
                            if (oldDay === newDay) {
                                let startNew = minorSectionScheduleArr[minorDay].startTime;
                                let endNew = minorSectionScheduleArr[minorDay].endTime;
                                if (illegalClass(startOld, endOld, startNew, endNew)) {
                                    overlapMsgArr.push(
                                        "Your class " + dept + " " + num + " " + studentCourseName + " overlaps with " + classType + " section " + minorSectionName + " on " + oldDay + ". "
                                    );
                                    OVERLAPS.push(minorSectionName);
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    overlapMsgArr = overlapMsgArr.map((message) => {
        return (
            <Alert color="primary">
                {message}
            </Alert>
        )
    });
    return (
        <div>
            {overlapMsgArr.length === 0 ? "No Overlaps" : overlapMsgArr}
        </div>
    );
}

function CourseOverview(props) {
    let course = props.course;
    return(
        <div className="section">
            <h2 className="courseHeading">{course.department + " " + course.number + " (" + course.credits + ")"}</h2>
            <hr/>
            <div>
                <table className="overviewTable">
                    <tbody>
                        <tr>
                            <td>Course Description</td>
                            <td>{course.courseDesc}</td>
                        </tr>
                        <tr>
                            <td>Course Prerequisites</td>
                            <td>{course.preReqs}</td>
                        </tr>
                        <tr>
                            <td>Quarters</td>
                            <td>{course.quarter}</td>
                        </tr>
                        <tr>
                            <td>Gen Edu Req</td>
                            <td>{course.genEd}</td>
                        </tr>
                        <tr>
                            <td>Curriculum</td>
                            <td>{course.curriculum}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p>If you need help on how to register or waitlist a course, <Link to="/course/about"> click here!</Link></p>
        </div>
    )
}


function SectionCard(props) {
    let sectionName = props.section.sectionName;
    let info = props.section;
    let schedule = "";
    let time = info.schedule[0].startTime + " - " + info.schedule[0].endTime;
    for (let i = 0; i < info.schedule.length; i++) {
        switch (info.schedule[i].day) {
            case "Thursday":
                schedule += info.schedule[i].day.substring(0, 2);
                break;
            case "Saturday":
                schedule += info.schedule[i].day.substring(0, 2);
                break;
            default:
                schedule += info.schedule[i].day.charAt(0);
        }
    }

    let addCourseClick = () => {
        props.handleCourseAdd(info);
    }

    let addOverlapError = () => {
        props.handleOverlapErrors(sectionName);
    }

    return (
        <tr>
            <td><h3>{sectionName}</h3></td>
            <td>{info.classType}</td>
            <td>{info.room}</td>
            <td>{schedule}</td>
            <td>{time}</td>
            <td>
                <div className="flexbox courseStatus">
                    <p>{info.spotsOccupied === info.spotsTotal ? 'Closed' : 'Open'}</p>
                    <p>{info.spotsOccupied} of {info.spotsTotal}</p>
                </div>
            </td>
            <td>
                <i className="fa fa-plus-circle" onClick={props.cantAdd(sectionName) ? addOverlapError : addCourseClick}></i>
            </td>
        </tr>
    )
}

function MainSectionCards(props) {

    // adds the correct course to the list but some of the properties of the new class object have wrong data type, fix later

    let mainSection = props.sectionChunk;
    let minorSections = mainSection.sections;
    let mainSectionName = mainSection.sectionName;
    let time = mainSection.schedule[0].startTime + " - " + mainSection.schedule[0].endTime;

    let sectionArr = minorSections.map((section) => {
        let minorSection = (
        <SectionCard section={section} 
        mainName={mainSectionName} 
        key={section.sectionName} 
        handleCourseAdd={props.handleCourseAdd}
        cantAdd={props.cantAdd}
        handleOverlapErrors={props.handleOverlapErrors}/>
        );
        return minorSection;
    });

    let addCourseClick = () => {
        props.handleCourseAdd(mainSection);
    }

    let addOverlapError = () => {
        props.handleOverlapErrors(mainSectionName);
    }

    let schedule = "";
    for (let i = 0; i < mainSection.schedule.length; i++) {
        switch (mainSection.schedule[i].day) {
            case "Thursday":
                schedule += mainSection.schedule[i].day.substring(0, 2);
                break;
            case "Saturday":
                schedule += mainSection.schedule[i].day.substring(0, 2);
                break;
            default:
                schedule += mainSection.schedule[i].day.charAt(0);
        }
    }

    return (
        <tbody>
            <tr>
                <td>
                    <h3>{mainSection.sectionName}</h3>
                </td>
                <td>{mainSection.classType}</td>
                <td>{mainSection.room}</td>
                <td>{schedule}</td>
                <td>{time}</td>
                <td>
                    <div className = "flexbox courseStatus">
                        <p>{mainSection.spotsOccupied === mainSection.spotsTotal ? "Closed" : "Open"}</p>
                        <p>{mainSection.spotsOccupied} of {mainSection.spotsTotal}</p>
                    </div>
                </td>
                <td><i className="fa fa-plus-circle" onClick={props.cantAdd(mainSection.sectionName) ? addOverlapError : addCourseClick}></i></td>
            </tr>
            {sectionArr}
        </tbody>
    );
}



function CourseSectionsList(props) {

    let handleCourseAdd = props.handleCourseAdd;
    let courseSections = props.courseSections;
    let sectionChunks = courseSections.map((sectionChunk) => {
        let sectionRows = (
            <MainSectionCards 
            sectionChunk={sectionChunk} 
            handleReg={props.handleReg} 
            handleCourseAdd={handleCourseAdd} 
            course={props.course}
            cantAdd={props.cantAdd}
            handleOverlapErrors={props.handleOverlapErrors}/>
        );
        return sectionRows;
    });
    return (
        <div className = "section">
            <h2 className="courseHeading">Course Sections</h2>
            <hr/>
            <table className="table table-hover table-striped courseTable">
                {sectionChunks}
            </table>
        </div>
    )

}

export default CoursePage;