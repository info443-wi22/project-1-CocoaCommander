import { Alert } from 'reactstrap';
import React from 'react';

export function SectionOverlapErrors(props) {
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
