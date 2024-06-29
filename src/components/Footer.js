import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white p-4 mt-8">
            <div className="text-center">
                <p>&copy; 2024 Trip Planner AI. All rights reserved.</p>
                <nav className="mt-4">
                    <a href="/about" className="mr-4">About</a>
                    <a href="/contact" className="mr-4">Contact</a>
                    <a href="/privacy">Privacy Policy</a>
                </nav>
            </div>
        </footer>
    );
};

export default Footer;
