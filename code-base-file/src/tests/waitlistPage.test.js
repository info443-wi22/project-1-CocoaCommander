import '@testing-library/jest-dom'
import { findAllByRole, render, screen } from '@testing-library/react';
import {deleteCourses, getScheduleDay} from '../Logic/waitlistPageLogic';
import WaitlistPage from '../Pages/WaitlistPage'
// import ref from './setupTests'
import { getDatabase, ref, get, onValue, set } from 'firebase/database';
import SAMPLE_STUDENT from '../EXAMPLE_STUDENT.json'
import WaitlistCourses from '../Components/waitlistPage/WaitlistCourses';

//initialize the database for waitlist
console.log(getDatabase());

describe('Waitlist Page tests', () => {
    test('Outputs the waitlist header', () => {
        render(
            <WaitlistPage student={SAMPLE_STUDENT} />
        )
        expect(screen.getByText("Waitlist")).toBeInTheDocument();
    });
    
    test('Displays the right text if user has no current waitlist', () => {
        const studentWithEmptyWaitlist = {
            "studentID": 1865214,
            "studentFName": "Ryan",
            "studentLName": "Lee",
            "major": "Informatics",
            "waitlist":[],
            "classList":[
                {
                    "department": "INFO",
                    "number": 340,
                    "credits": 5,
                    "genEd": "",
                    "sections": [
                        {
                            "sectionName": "A",
                            "instructorFName": "Joel",
                            "instructorLName": "Ross",
                            "classType": "Lecture",
                            "room": "Remote",
                            "schedule": [
                                {"day": "Monday", "startTime": "8:30 AM", "endTime": "10:20 AM"},
                                {"day": "Wednesday", "startTime": "8:30 AM", "endTime": "10:20 AM"}
                            ]
                        },
                        {
                            "sectionName": "AB",
                            "instructorFName": "Khoa",
                            "instructorLName": "Luong",
                            "classType": "Lab",
                            "room": "Remote",
                            "schedule": [
                                {"day": "Monday", "startTime": "9:30 AM", "endTime": "10:20 AM"}
                            ]
                        }
                    ]
                },
                {
                    "department": "INFO",
                    "number": 330,
                    "credits": 5,
                    "genEd": "",
                    "sections": [
                        {
                            "sectionName": "B",
                            "instructorFName": "Greg",
                            "instructorLName": "Hay",
                            "classType": "Lecture",
                            "room": "remote",
                            "schedule": [
                                {"day": "Tuesday", "startTime": "1:30 PM", "endTime": "3:20 PM"},
                                {"day": "Thursday", "startTime": "1:30 PM", "endTime": "3:20 PM"}
                            ]
                        },
                        {
                            "sectionName": "BA",
                            "instructorFName": "Connor",
                            "instructorLName": "Voelk",
                            "classType": "Lab",
                            "room": "remote",
                            "schedule": [
                                {"day": "Tuesday", "startTime": "4:30 PM", "endTime": "5:20 PM"}
                            ]
                        }
                    ]
                },
                {
                    "department": "INFO",
                    "number": 380,
                    "credits": 5,
                    "genEd": "",
                    "sections": [ 
                        {
                            "sectionName": "A",
                            "instructorFName": "Richard",
                            "instructorLName": "Sturmann",
                            "classType": "Lecture",
                            "room": "remote",
                            "schedule": [
                                {"day": "Monday", "startTime": "1:30 PM", "endTime": "3:20 PM"},
                                {"day": "Wednesday", "startTime": "1:30 PM", "endTime": "3:20 PM"}
                            ]
                        },
                        {
                            "sectionName": "AC",
                            "instructorFName": "Rose",
                            "instructorLName": "Paquet",
                            "classType": "Lab",
                            "room": "remote",
                            "schedule": [
                                {"day": "Tuesday", "startTime": "10:30 AM", "endTime": "11:20 AM"}
                            ]
                        }
                    ]
                }
            ]
        };
        render(
            <WaitlistPage student={studentWithEmptyWaitlist} />
        )
        expect(screen.getByText("You aren't on the waitlist for any classes yet! (You need to click the register button twice.)")).toBeInTheDocument();
    });

    //if there's waitlist, display waitlist
    test('Displays the appropriate waitlist for user', () => {
        const studentWithWaitlist = {
            "studentID": 1865214,
            "studentFName": "Ryan",
            "studentLName": "Lee",
            "major": "Informatics",
            "waitlist":[{
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
            }],
            "classList":[
                {
                    "department": "INFO",
                    "number": 340,
                    "credits": 5,
                    "genEd": "",
                    "sections": [
                        {
                            "sectionName": "A",
                            "instructorFName": "Joel",
                            "instructorLName": "Ross",
                            "classType": "Lecture",
                            "room": "Remote",
                            "schedule": [
                                {"day": "Monday", "startTime": "8:30 AM", "endTime": "10:20 AM"},
                                {"day": "Wednesday", "startTime": "8:30 AM", "endTime": "10:20 AM"}
                            ]
                        },
                        {
                            "sectionName": "AB",
                            "instructorFName": "Khoa",
                            "instructorLName": "Luong",
                            "classType": "Lab",
                            "room": "Remote",
                            "schedule": [
                                {"day": "Monday", "startTime": "9:30 AM", "endTime": "10:20 AM"}
                            ]
                        }
                    ]
                },
                {
                    "department": "INFO",
                    "number": 330,
                    "credits": 5,
                    "genEd": "",
                    "sections": [
                        {
                            "sectionName": "B",
                            "instructorFName": "Greg",
                            "instructorLName": "Hay",
                            "classType": "Lecture",
                            "room": "remote",
                            "schedule": [
                                {"day": "Tuesday", "startTime": "1:30 PM", "endTime": "3:20 PM"},
                                {"day": "Thursday", "startTime": "1:30 PM", "endTime": "3:20 PM"}
                            ]
                        },
                        {
                            "sectionName": "BA",
                            "instructorFName": "Connor",
                            "instructorLName": "Voelk",
                            "classType": "Lab",
                            "room": "remote",
                            "schedule": [
                                {"day": "Tuesday", "startTime": "4:30 PM", "endTime": "5:20 PM"}
                            ]
                        }
                    ]
                },
                {
                    "department": "INFO",
                    "number": 380,
                    "credits": 5,
                    "genEd": "",
                    "sections": [ 
                        {
                            "sectionName": "A",
                            "instructorFName": "Richard",
                            "instructorLName": "Sturmann",
                            "classType": "Lecture",
                            "room": "remote",
                            "schedule": [
                                {"day": "Monday", "startTime": "1:30 PM", "endTime": "3:20 PM"},
                                {"day": "Wednesday", "startTime": "1:30 PM", "endTime": "3:20 PM"}
                            ]
                        },
                        {
                            "sectionName": "AC",
                            "instructorFName": "Rose",
                            "instructorLName": "Paquet",
                            "classType": "Lab",
                            "room": "remote",
                            "schedule": [
                                {"day": "Tuesday", "startTime": "10:30 AM", "endTime": "11:20 AM"}
                            ]
                        }
                    ]
                }
            ]
        };

        let setWaitlistData = () => {}
        const db = getDatabase();
        let dataRef = ref(db, 'student/schedule');

        render(
            <WaitlistCourses waitlist={studentWithWaitlist.waitlist} setWaitlistData={setWaitlistData} dataRef={dataRef}/>
        )
        expect(screen.getByText("CSE 373 (4)")).toBeInTheDocument();
    });

    test('Displays the correct abbreviation for schedule', () => {
        let result = [];
        result.push(getScheduleDay({"schedule": [
            {
                "day": "Thursday", 
                "startTime": "9:30 AM", 
                "endTime": "10:20 AM"
            }
        ]}));
        result.push(getScheduleDay({"schedule": [
            {
                "day": "Saturday", 
                "startTime": "9:30 AM", 
                "endTime": "10:20 AM"
            }
        ]}));
        result.push(getScheduleDay({"schedule": [
            {
                "day": "Monday", 
                "startTime": "9:30 AM", 
                "endTime": "10:20 AM"
            }
        ]}));
        let expected = ["Th", "Sa", "M"];
        expect(result).toStrictEqual(expected);
    });
})