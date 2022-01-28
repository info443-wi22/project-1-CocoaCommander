import React from 'react';
import { NavLinks } from './NavLinks';

export function Header() {
    return (
        <header>
            <div className='headerDiv'>
                <div className='header'>MyPlan.</div>
            </div>
            <NavLinks />
        </header>
    );
}
