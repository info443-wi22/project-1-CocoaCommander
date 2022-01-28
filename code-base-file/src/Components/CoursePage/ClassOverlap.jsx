import { Alert } from 'reactstrap';
import React from 'react';
import { checkCurrentScheduleForOverlapsWithGivenCourse } from '../../Logic/classOverlapAlertsLogic';

export function ClassOverlapAlerts({
    illegalClass,
    classList,
    courseData,
    OVERLAPS
}) {
    let overlapMsgArr = checkCurrentScheduleForOverlapsWithGivenCourse(classList, courseData, illegalClass, OVERLAPS);

    overlapMsgArr = overlapMsgArr.map((message) => {
        return (
            <Alert color="primary">
                {message}
            </Alert>
        );
    });
    return (
        <div>
            {overlapMsgArr.length === 0 ? "No Overlaps" : overlapMsgArr}
        </div>
    );
}

