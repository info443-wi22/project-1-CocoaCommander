import React from 'react';

export function SectionCard(props) {
    let sectionName = props.section.sectionName;
    let info = props.section;
    let schedule = "";
    let time = info.schedule[0].startTime + " - " + info.schedule[0].endTime;
    for (let i = 0; i < info.schedule.length; i++) {
        switch (info.schedule[i].day) {
            case "Thursday":
                schedule += info.schedule[i].day.substring(0, 2);
                break;
            case "Saturday":
                schedule += info.schedule[i].day.substring(0, 2);
                break;
            default:
                schedule += info.schedule[i].day.charAt(0);
        }
    }

    let addCourseClick = () => {
        props.handleCourseAdd(info);
    };

    let addOverlapError = () => {
        props.handleOverlapErrors(sectionName);
    };

    return (
        <tr>
            <td><h3>{sectionName}</h3></td>
            <td>{info.classType}</td>
            <td>{info.room}</td>
            <td>{schedule}</td>
            <td>{time}</td>
            <td>
                <div className="flexbox courseStatus">
                    <p>{info.spotsOccupied === info.spotsTotal ? 'Closed' : 'Open'}</p>
                    <p>{info.spotsOccupied} of {info.spotsTotal}</p>
                </div>
            </td>
            <td>
                <i className="fa fa-plus-circle" onClick={props.cantAdd(sectionName) ? addOverlapError : addCourseClick}></i>
            </td>
        </tr>
    );
}
