import React, { useState } from 'react';
import { Route, Switch, Link, Redirect, NavLink} from "react-router-dom";
import 'font-awesome/css/font-awesome.min.css';
import CoursePage from './coursePage'
import WaitlistPage from './waitlistPage'
import AboutCoursePage from './aboutCoursePage'

function App(props) {
   
    const renderCoursePage = (routerProps) => {
        return <CoursePage {... routerProps} props={props}/>
      }

    const renderWaitlistPage = (routerProps) => {
        return <WaitlistPage {... routerProps} props={props} />
    }
    
    const renderAboutCoursePage = (routerProps) => {
        return <AboutCoursePage {... routerProps} props={props} />
    }

    return(
        <div>
            <Header />
            <div className='mainContent'>
                <Switch>
                    <Route exact path="/course" render={renderCoursePage} />
                    <Route path="/waitlist" render={renderWaitlistPage} />
                    <Route path="/course/about" render={renderAboutCoursePage} />
                    <Redirect to="/course" />
                </Switch>
            </div>
            <Footer />
        </div>
    )
}

function Footer() {
    return (
        <footer>
            <div className="container-fluid footer">
                <img 
                src="https://s3-us-west-2.amazonaws.com/uw-s3-cdn/wp-content/uploads/sites/98/2014/09/07214443/Signature_Center_Purple_Hex.png"
                alt = "UW Logo" className="logoImg"></img>
                <a href="mailto:ryanl32@uw.edu" className="footerText">Contact Us</a>
                <p className="footerText">&copy; Ryan Lee and Vanessa Sugiharto</p>
            </div>
        </footer>
    );
}

function Header() {
    return(
        <header>
            <div className = 'headerDiv'>
                <NavLinks />
                <div className = 'header'>
                    <h1><Link to="/course" className="headerLink">MyPlan.</Link></h1>
                </div>
            </div>
        </header>
    );
}

function NavLinks() {
    return(
        <nav>
            <ul>
                <li className="navList"><NavLink exact to="/course" className="navLink">Courses</NavLink></li>
                <li className="navList"><NavLink to="/waitlist" className="navLink">Waitlist</NavLink></li>
            </ul>
        </nav>
    );
}

export default App;