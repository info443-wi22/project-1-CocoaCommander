import React from 'react';
import { Link } from "react-router-dom";


export function NavLinks() {
    return (
        <nav>
            <Link to="course">Course</Link>
            <Link to="waitlist">Waitlist</Link>
            <Link to="about">About</Link>
        </nav>
    );
}
