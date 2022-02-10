# Project 1 Full Report

Created by: Vanessa Sugiharto & Ryan Lee

---
## Code Structure Analysis
### Architectural Elements
#### External packages
- React App: The framework of the whole website itself
- Firebase Realtime Database: External database to store a student’s waitlist

#### App
The main structure of the application; located in src/App.jsx

##### App Components
located in src/Components/App and wrap the entire app
- Header: Overall header for the app
- Footer: Overall footer for the app
- NavLinks: Navigation links located on the header

#### Course Page
A page that displays the course description and the sections they provide; located in src/Pages/CoursePage.jsx

##### Course Page Components:
UI components that make up the CoursePage; located in src/Components/CoursePage

- CourseOverview: Description about the course itself
- ClassOverlapAlerts: An alert that pops up if any of the sections with the user selected course overlaps with any part of a student’s current list of courses
- SectionOverlapErrors: An alert that pops up if the chosen course section overlaps with the current student schedule
- CoursesToAdd: An alert that pops up if the lecture and sections are about to be added onto the waitlist
- CourseSectionsList: A list of the sections and its details of the course
- RegisterPotentialClasses: Button to add the chosen sections to the waitlist
- MainSectionCards: The card that displays the lecture section’s details
- SectionCard: The card that displays the quiz section’s details

##### Course Page Logic:
- classOverlapAlertsLogic: iterates through all of a student’s courses and compares the selected course for possible overlaps in time.
- coursePageLogic: module of helper functions to process data and interactions that occur on the CoursePage and any of its child components

#### Waitlist Page
A page that displays a student’s waitlist courses

##### Waitlist Page Components:
- WaitlistCourses: A list of courses that are in the current waitlist of the student
- WaitlistCourseSections: Maps out the cards for each course in the student’s waitlist
- WaitlistSectionDetail: The card that displays each section’s details

##### Waitlist Page Logic: 
- waitlistPageLogic: Allow users to remove course out from waitlist, get the abbreviation of the days

### Relationship Diagram
![Relationship Diagram](/relationshipDiagram.png)
Fig 1: Diagram of all UI components and their state/related functions

### Code’s Process Flow
![Code Process Flow](/codeProcessFlow.png)
Fig 2: Diagram of expected data and logic al flow of App <br>
In the nav bar on the top right of the website, clicking “Course” will direct you to the course page, while clicking “Waitlist” will direct you to the waitlist page.

#### Course Page
A student’s list of courses is loaded into the page along with a course that the student wants to register for. The student’s list of courses is compared with all the times of the course that the student wants to register for, and any sections that overlap with the student’s current classes will be noted.

If a student selects a section and lab that does not interfere with their current list of courses, they are able to register for the waitlist for their selected sections.

#### Waitlist Page
The waitlist page shows a list of user’s courses on their waitlist. If the student has no waitlist, nothing will be shown. If the user has some courses on their waitlist, it shows some information about the section itself as well as the option to remove them from the student’s waitlist.

---

## Architecture Assessment

This project will analyze, refactor, and validate the WaitlistPage component

### Code Smells
| Type of Code Smell  | Description                                                                                                                                                                                                                                                                                                                                                            |
|---------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Mysterious Name     | Using names that’s really abstract and does not deliver it’s true meaning, confuses people reading the code. In WaitlistCourseSections.jsx, the variable “schedule” is not as clear when it should just say that it’s section’s time schedules.                                                                                                                        |
| Long parameter list | The parameter can be obtained by using another parameter, making the parameter list long. In WaitlistCourseSections.jsx, “courseName” is a restructured string made up of “course” details but both parameters are passed onto “WaitlistSectionDetail”.                                                                                                                |
| Data clumps         | There are the same parameters passed through the functions throughout the files when it can be made into an object instead and make some space. Through the components from WaitlistPage to WaitlistSectionDetail, the same parameters are passed through like “waitlist”, “setWaitlistData” and “dataRef” which could be turned into objects and improve readability. |
| Lazy Element        | Creating variables with improper or unused structure. In WaitlistSectionDetail.jsx, line 23, the “section.schedule[0].startTime” is extracted, but only the first variable in the “section.schedule’s” array, where the array structure is unused.                                                                                                                     |
| Comments            | Commented out code that’s not really doing anything as shown in WaitlistPage.jsx (line 15) and WaitlistCourses.jsx(line 16).                                                                                                                                                                                                                                           |

### Documentation
All components are under a module that exports the page the component is located on. While this may make it easier to trace the various parameters, the file is too long to read overall.

### Standards violation
- FERPA violation
  - Student’s details are not stored safely and are in a JSON file which is saved in the source code.

### Design quality deficiencies
- Security: 
  - The key to firebase is not stored securely or in an encrypted and safe file. The student’s records are also not saved securely as it is in a JSON file in the source code.
  - Students are also not authenticated, so anybody with access to the site could change the test and database data

## Unit Tests
### Running Tests
1. Make sure to run `npm install` before running any tests
2. Run `npm run test -- --coverage` inside of the code-base-file folder
    - Note that this will run test suites for both the WaitlistPage and the CoursePage since we forgot to read the part about “one architectural element”
    - The test/refactoring discussion will refer to the WaitlistPage
    - CoursePage tests are unfinished and will not be finished due to time and scope constraints of this project
    - This page also does not run many tests as both the interactions and test data set are relatively simple, but affect the rest of the system in a major way

### Test Discussion
| Test                                                      | Description                                                                                                                                |
|-----------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------|
| 'Outputs the waitlist header'                             | Waitlist page is rendered correctly (we make sure that the basic page component that houses all our other components renders successfully) |
| 'Displays the right text if user has no current waitlist' | Correct error message is rendered if student is not on the waitlist for any courses.                                                       |
| 'Displays the appropriate waitlist for user'              | Correct waitlist elements are rendered if student is on the waitlist for one or more courses                                               |
| 'Displays the correct abbreviation for schedule’          | Thursday and saturday are abbreviated to “Th” and “Sa” respectively, all other days are shortened to the first letter of that day          |

*NOTE: As per TA instructions, we did not test the delete functionality of the waitlist as it deals with firebase functions.

### Test Output Documentation
![test output](/testOutput.png)
Fig 3: All waitlist page tests pass; note that the CoursePage, CoursePage Components, and coursePageLogic were not tested since they are not the architectural element that we tested for.

## Refactoring The Code
| Type of Code Smell  | Fix                                                                                                                                                                                                                 |
|---------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Mysterious Name     | Variables renamed: schedule -> dayOfCourse; courseName -> courseNameAndCredits                                                                                                                                      |
| Long parameter list | Eliminated redundant params; grouped similar params that were passed down into props (see below)                                                                                                                    |
| Data clumps         | waitlist, setWaitlist, and dataRef -> stored in props object                                                                                                                                                        |
| Lazy Element        | WaitlistSectionDetail.jsx line 23 changed “section.schedule[0].startTime” to "section.schedule[index].startTime” where index accesses the given schedule in section.schedule from its original location in the list |
| Comments            | Removed comments                                                                                                                                                                                                    |