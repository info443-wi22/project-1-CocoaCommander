import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { 
    handleClassRegistration, 
    checkForOverlappingClasses, 
    setOverlapErrorMessage, 
    validateCourseAdditions, 
    doesClassOverlap 
} from '../Logic/coursePageLogic';
import { RegisterPotentialClasses } from '../Components/CoursePage/RegisterPotentialClasses';
import { CoursesToAdd } from '../Components/CoursePage/CoursesToAdd';
import { SectionOverlapErrors } from '../Components/CoursePage/SectionOverlapErrors';
import { CourseOverview } from '../Components/CoursePage/CourseOverview';
import { CourseSectionsList } from '../Components/CoursePage/CourseSectionsList';
import { ClassOverlapAlerts } from '../Components/CoursePage/ClassOverlap';

const CoursePage = ({
    student,
    course
}) => {

    const [schedule, setSchedule] = useState(student.waitlist);
    const OVERLAPS = [];
    const [overlapErrors, setOverlapErrors] = useState("");
    const [potentialCourses, setPotentialCourses] = useState([]);
    
    let handleReg = handleClassRegistration(schedule, course, setSchedule)

    let cantAdd = checkForOverlappingClasses(OVERLAPS)

    let handleOverlapErrors = setOverlapErrorMessage(setOverlapErrors)

    let handleCourseAdd = validateCourseAdditions(potentialCourses, setPotentialCourses, setOverlapErrors)

    let illegalClass = doesClassOverlap();

    return(
        <div>
            <CourseOverview course={course}/>
            <ClassOverlapAlerts
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


export default CoursePage;