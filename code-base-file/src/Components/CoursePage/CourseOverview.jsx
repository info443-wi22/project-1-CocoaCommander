import React from 'react';
import { Link } from "react-router-dom";

export function CourseOverview(props) {
    let course = props.course;
    return (
        <div className="section">
            <h2 className="courseHeading">{course.department + " " + course.number + " (" + course.credits + ")"}</h2>
            <hr />
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
    );
}
