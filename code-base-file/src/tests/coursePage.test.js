import App from '../App';
import CoursePage from '../Pages/CoursePage'
import SAMPLE_STUDENT from '../EXAMPLE_STUDENT.json'
import SAMPLE_COURSE from '../EXAMPLE_COURSE.json'
import { render } from '@testing-library/react';

test('App loads course add page on startup', () => {
    render(<App student={SAMPLE_STUDENT} course={SAMPLE_COURSE}/>);
});