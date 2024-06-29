import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="bg-blue-500 text-white p-4">
            <nav className="flex justify-between items-center">
                <div className="text-2xl font-bold">
                    <Link to="/">Trip Planner AI</Link>
                </div>
                <div>
                    <Link to="/profile" className="mr-4">Profile</Link>
                    <Link to="/login" className="mr-4">Login</Link>
                    <Link to="/signup">Sign Up</Link>
                </div>
            </nav>
        </header>
    );
};

export default Header;
