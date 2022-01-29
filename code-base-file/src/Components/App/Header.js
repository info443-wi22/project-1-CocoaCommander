import React from 'react';
import { NavLinks } from './NavLinks';
import { Link } from 'react-router-dom';

export function Header() {
    return (
        <header>
            <div className='headerDiv'>
                <NavLinks />
                <div className='header'>
                    <Link to="">
                        <h1 className='headerLink'>
                            MyPlan.
                        </h1>
                    </Link>
                </div>
            </div>
        </header>
    );
}
