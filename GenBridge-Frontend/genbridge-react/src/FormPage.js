import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from './creative-abstract-bridge-logo-design-template-1.png';
import './style.css'; // Import your CSS styles

const FormPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, senior, speech } = location.state;

    // State for form answers
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');

    const handleSubmit = () => {
        const interests = [answer1, answer2];
        // Check if the user is a senior
        if (senior) {
            // If senior, navigate to MatchPage with the collected data
            navigate('/match', { state: { name, senior, interests, speech } });
        } else {
            // If not a senior (thus, a junior), navigate to EnterCalendlyLinkPage
            navigate('/enter-calendly', { state: { name, senior, interests } });
        }
    };

    return (
        <div className="formpage-container">
            <img src={logo} alt="Logo" className="formpage-logo" />
            <h1 className="formpage-heading">Some questions for you</h1>
            <form onSubmit={handleSubmit} className="formpage-form">
                <div className="form-group">
                    <label htmlFor="question1" className="form-label">What do/did you work as?</label>
                    <input
                        id="question1"
                        type="text"
                        value={answer1}
                        onChange={(e) => setAnswer1(e.target.value)}
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="question2" className="form-label">What do you do for fun?</label>
                    <input
                        id="question2"
                        type="text"
                        value={answer2}
                        onChange={(e) => setAnswer2(e.target.value)}
                        className="form-input"
                    />
                </div>
                <button className="button" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FormPage;
