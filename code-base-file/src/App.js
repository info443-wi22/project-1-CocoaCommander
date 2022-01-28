import React, { useState } from 'react';
import { Link, Outlet} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import CoursePage from './Pages/CoursePage'
import WaitlistPage from './waitlistPage'
import AboutCoursePage from './aboutCoursePage'
import { Footer } from './Components/App/Footer';
import { Header } from './Components/App/Header';

const App = ({
    student,
    course
}) => {


    return(
        <div>
            <Outlet />
        </div>
    )
}

export default App;