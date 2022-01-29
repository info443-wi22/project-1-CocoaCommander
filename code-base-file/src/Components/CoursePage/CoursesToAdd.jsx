import { Alert } from 'reactstrap';
import React from 'react';

export function CoursesToAdd(props) {
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
