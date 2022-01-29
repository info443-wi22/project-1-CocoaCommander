import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { MemoryRouter } from 'react-router-dom'
import App from '../App'
import { Header } from '../Components/App/Header'
import { Footer } from '../Components/App/Footer'
import firebase from 'firebase/app';
import 'firebase/database';
import { ClassOverlapAlerts } from '../Components/coursePage/ClassOverlap'
import { doesClassOverlap } from '../Logic/coursePageLogic'

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

describe('App renders correctly', () => {
    
    test('Landing page is course add page', () => {
        render(<App />, {wrapper: MemoryRouter});
        expect(screen.getByText("CSE 373 (4)")).toBeInTheDocument();
    });

    test('Navigating to waitlist renders corrrectly', () => {
        render(
            <MemoryRouter>
                <Header />
                <App />
                <Footer />
            </MemoryRouter>
        );
        const leftClick = {button: 0}
        userEvent.click(screen.getByText("Waitlist"), leftClick);
        expect(screen.getByText("You aren't on the waitlist for any classes yet! (You need to click the register button twice.)")).toBeInTheDocument();
    });

    test('Navigating to About renders correctly', () => {
        render(
            <MemoryRouter>
                <Header />
                <App />
                <Footer />
            </MemoryRouter>
        );
        const leftClick = {button: 0};
        userEvent.click(screen.getByText("About"), leftClick);
        expect(screen.getByText("About Course Page")).toBeInTheDocument();
    })
})
