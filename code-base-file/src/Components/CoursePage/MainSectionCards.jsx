import React from 'react';
import { SectionCard } from './SectionCard';

export function MainSectionCards(props) {
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
