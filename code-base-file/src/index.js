import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';
import SAMPLE_STUDENT from './EXAMPLE_STUDENT.json';
import SAMPLE_COURSE from './EXAMPLE_COURSE.json';
import firebase from 'firebase/app';
import 'firebase/database';
import './style.css';
import CoursePage from './Pages/CoursePage';
import WaitlistPage from './waitlistPage';
import AboutCoursePage from './aboutCoursePage';
import { Header } from './Components/App/Header';
import { Footer } from './Components/App/Footer';

const firebaseConfig = {
  apiKey: "AIzaSyAsZ8v2EvOi5_KXwe_JdPv_hRGSNjnDRHM",
  authDomain: "info340myplan.firebaseapp.com",
  databaseURL: "https://info340myplan-default-rtdb.firebaseio.com/",
  projectId: "info340myplan",
  storageBucket: "info340myplan.appspot.com",
  messagingSenderId: "970126728751",
  appId: "1:970126728751:web:d2e1586cd9812f94d030da",
  measurementId: "G-QJ15MH0V1F"
};

firebase.initializeApp(firebaseConfig);

ReactDOM.render(
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<App/>}>
          <Route index element={<CoursePage student={SAMPLE_STUDENT} course={SAMPLE_COURSE} />} />
          <Route path={"waitlist"} element={<WaitlistPage/>} />
          <Route path={"about"} element={<AboutCoursePage/>} />
        </Route>
      </Routes>
      <Footer/>
    </Router>,
  document.getElementById('root')
);
