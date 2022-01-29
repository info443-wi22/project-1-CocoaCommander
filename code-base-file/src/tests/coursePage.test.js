import SAMPLE_STUDENT from '../EXAMPLE_STUDENT.json'
import SAMPLE_COURSE from '../EXAMPLE_COURSE.json'
import '@testing-library/jest-dom'
import { findAllByRole, render, screen } from '@testing-library/react';
import CoursePage from '../Pages/CoursePage';
import { ClassOverlapAlerts } from '../Components/coursePage/ClassOverlap';
import { checkForOverlappingClasses, doesClassOverlap } from '../Logic/coursePageLogic';
import { checkCurrentScheduleForOverlapsWithGivenCourse } from '../Logic/classOverlapAlertsLogic';

describe('Course Add Page tests', () => {
    test('CoursePage loads with overlaps for given data', () => {
        render(
            <CoursePage student={SAMPLE_STUDENT} course={SAMPLE_COURSE} />
        )
        expect(screen.getByText("Your class INFO 340 A overlaps with Quiz section AA on Monday.")).toBeInTheDocument();
    });

    test('CoursePage displays the right message if there are no overlaps', () => {
        const classWithNoOverlaps = {
            "department": "CSE",
            "number": 373,
            "courseName": "Data Structures And Algorthms",
            "courseDesc": "Fundamental algorithms and data structures for implementation. Techniques for solving problems by programming. Linked lists, stacks, queues, directed graphs. Trees: representations, traversals. searching (hashing, binary search trees, multiway trees). Garbage collection, memory management. internal and external sorting. intended for non-majors.",
            "preReqs": "CSE 143",
            "quarter": "Winter 2020",
            "genEd": "None",
            "credits": 4,
            "curriculum": "Computer Science and Engineering, Seattle campus",
            "courseSections": [
                {
                    "sectionName": "A", 
                    "instructorFName": "Vanessa",
                    "instructorLName": "Sugiharto",
                    "classType": "Lecture",
                    "room": "Remote",
                    "spotsOccupied": 120,
                    "spotsTotal": 120,
                    "schedule": [
                        {
                            "day": "Monday", 
                            "startTime": "3:30 PM", 
                            "endTime": "4:20 PM"
                        },
                        {
                            "day": "Wednesday", 
                            "startTime": "3:30 PM", 
                            "endTime": "4:20 PM"
                        },
                        {
                            "day": "Friday", 
                            "startTime": "3:30 PM", 
                            "endTime": "4:20 PM"
                        }
                    ],
                    "sections": [
                        {
                            "sectionName": "AB", 
                            "instructorFName": "Mirai",
                            "instructorLName": "Kuriyama",
                            "classType": "Quiz",
                            "room": "Remote",
                            "spotsOccupied": 60,
                            "spotsTotal": 60,
                            "schedule": [
                                {
                                    "day": "Tuesday", 
                                    "startTime": "9:30 AM", 
                                    "endTime": "10:20 AM"
                                }
                            ]
                        }
                    ]
                } 
            ]
        }

        render(
            <CoursePage student={SAMPLE_STUDENT} course={classWithNoOverlaps} />
        )
        expect(screen.getByText("No Overlaps")).toBeInTheDocument();
    })

    test('Class Overlaps Display the right amount of overlaps', async () => {
        render(
            <ClassOverlapAlerts
                classList={SAMPLE_STUDENT.classList} 
                courseData={SAMPLE_COURSE.courseSections} 
                illegalClass={doesClassOverlap}
                OVERLAPS={[]}
            />
        )
        const items = await screen.findAllByRole('alert');
        expect(items).toHaveLength(20);
    })
})
