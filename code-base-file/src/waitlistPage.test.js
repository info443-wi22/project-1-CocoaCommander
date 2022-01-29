import {deleteCourses} from './waitlistPage'
import WaitlistPage from './waitlistPage'
// import ref from './setupTests'
import { getDatabase, ref, get, onValue } from 'firebase/database';

//initialize the database for waitlist
//  console.log(mockDb.getDatabase())
console.log(getDatabase());


test('imports the whole page successfully', () => {
    console.log(WaitlistPage)
    expect(typeof WaitlistPage).toBe('function');
});

test('outputs the waitlist header', () => {
    console.log(WaitlistPage)
    expect(typeof WaitlistPage).toBe('function');
});

//if waitlist null, display appropriate text

//if there's waitlist, display waitlist

//check contents of what's displayed

//remove a course in waitlist
test('removes a course successfully from waitlist', () => {
    const db = getDatabase();
    //add a sample class data

    let setWaitlistData = () => {
            // do nothing
    }
    let dataRef = ref(db, 'student/schedule');
    // deleteCourses(dataRef={dataRef}, setWaitlistData={setWaitlistData});
    // let result = get('student/schedule');

    let data = [];

    onValue(dataRef, (snapshot) => {
        data = snapshot.val();
      });

    expect(data).toBe(0);
});