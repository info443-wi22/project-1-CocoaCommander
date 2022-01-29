import React from 'react';
import { Link } from "react-router-dom";


export function NavLinks() {
    return (
        <nav>
            <ul>
                <li className="navList"><Link className="navLink" to="">Course</Link></li>
                <li className="navList"><Link className="navLink" to="waitlist">Waitlist</Link></li>
                <li className="navList"><Link className="navLink" to="about">About</Link></li>
            </ul>

        </nav>
    );
}
