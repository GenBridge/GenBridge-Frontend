import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from './creative-abstract-bridge-logo-design-template-1.png';
import './style.css'; // Import your CSS styles

const EnterCalendlyLinkPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, senior, interests } = location.state; // Retrieve passed state
    const [calendlyLink, setCalendlyLink] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Combine the junior's data with the Calendly link
        const juniorData = { name, senior, interests, calendly: calendlyLink };

        try {
            const response = await fetch('https://genbridge-413824882f14.herokuapp.com/signup/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(juniorData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const result = await response.json();
            console.log(result);
            navigate('/waiting-room', { state: { ...juniorData, result } }); // Pass junior data and result to the next page
        } catch (error) {
            console.error('There was an error!', error);
        }
    };

    return (
        <div className="page-container">
            <img src={logo} alt="Logo" className="page-logo" />
            <h1 className="page-heading">Enter Your Calendly Link</h1>
            <form onSubmit={handleSubmit} className="page-form">
                <input
                    className="page-input"
                    type="text"
                    value={calendlyLink}
                    onChange={(e) => setCalendlyLink(e.target.value)}
                    placeholder="Enter your Calendly URL"
                    required
                />
                <button className="button" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EnterCalendlyLinkPage;
