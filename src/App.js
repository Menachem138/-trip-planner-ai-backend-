import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import TripPage from './components/TripPage';
import ProfilePage from './components/ProfilePage';
import LoginPage from './components/LoginPage'; // Import LoginPage component
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/trip/:id" element={<TripPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/login" element={<LoginPage />} /> {/* Add route for login page */}
            </Routes>
            <Footer />
        </Router>
    );
}

export default App;
