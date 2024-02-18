import React from 'react';
import './style.css'; // Import the same styles as used in HomePage
import logo from './creative-abstract-bridge-logo-design-template-1.png';

const WaitingRoom = () => {
    return (
        <div className="page-container">
            <img src={logo} alt="Logo" className="page-logo" />
            <h1 className="page-heading">Waiting Room</h1>
            <p className="page-description">
                Welcome to the waiting room. Please wait for your match to schedule a meeting with you.
            </p>
        </div>
    );
};

export default WaitingRoom;