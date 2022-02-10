import React from 'react';
import { SectionCard } from './SectionCard';
import { getScheduleDay } from '../../Logic/waitlistPageLogic';

export function MainSectionCards(props) {

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
                handleOverlapErrors={props.handleOverlapErrors} />
        );
        return minorSection;
    });

    let addCourseClick = () => {
        props.handleCourseAdd(mainSection);
    };

    let addOverlapError = () => {
        props.handleOverlapErrors(mainSectionName);
    };

    let schedule = getScheduleDay(mainSection);

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
                    <div className="flexbox courseStatus">
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
