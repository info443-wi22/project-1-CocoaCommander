import React from 'react';
import { Routes, Route } from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import CoursePage from './Pages/CoursePage'
import WaitlistPage from './waitlistPage'
import AboutCoursePage from './aboutCoursePage'
import SAMPLE_STUDENT from './EXAMPLE_STUDENT.json';
import SAMPLE_COURSE from './EXAMPLE_COURSE.json';
import { Header } from './Components/App/Header';

const App = () => {
    return (
        <>
            <Routes>
                <Route path={"/"} element={<CoursePage student={SAMPLE_STUDENT} course={SAMPLE_COURSE} />} />
                <Route path={"/Waitlist"} element={<WaitlistPage />} />
                <Route path={"/About"} element={<AboutCoursePage />} />
            </Routes>
        </>

    )
}

export default App;