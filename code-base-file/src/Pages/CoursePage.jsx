import React, { useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import { 
    handleClassRegistration, 
    checkForOverlappingClasses, 
    setOverlapErrorMessage, 
    validateCourseAdditions, 
    doesClassOverlap 
} from '../Logic/coursePageLogic';
import { RegisterPotentialClasses } from '../Components/coursePage/RegisterPotentialClasses';
import { CoursesToAdd } from '../Components/coursePage/CoursesToAdd';
import { SectionOverlapErrors } from '../Components/coursePage/SectionOverlapErrors';
import { CourseOverview } from '../Components/coursePage/CourseOverview';
import { CourseSectionsList } from '../Components/coursePage/CourseSectionsList';
import { ClassOverlapAlerts } from '../Components/coursePage/ClassOverlap';

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
                classList={student.classList} 
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