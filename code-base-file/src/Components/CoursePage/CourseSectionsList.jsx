import React from 'react';
import { MainSectionCards } from './MainSectionCards';

export function CourseSectionsList(props) {

    let handleCourseAdd = props.handleCourseAdd;
    let courseSections = props.courseSections;
    let sectionChunks = courseSections.map((sectionChunk) => {
        let sectionRows = (
            <MainSectionCards
                sectionChunk={sectionChunk}
                handleReg={props.handleReg}
                handleCourseAdd={handleCourseAdd}
                course={props.course}
                cantAdd={props.cantAdd}
                handleOverlapErrors={props.handleOverlapErrors} />
        );
        return sectionRows;
    });
    return (
        <div className="section">
            <h2 className="courseHeading">Course Sections</h2>
            <hr />
            <table className="table table-hover table-striped courseTable">
                {sectionChunks}
            </table>
        </div>
    );

}
