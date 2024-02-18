import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Make sure your CSS file is imported
import logo from './creative-abstract-bridge-logo-design-template-1.png';


const HomePage = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/role', { state: { name: name } });
    };

    return (
        <div className="homepage-container">
            <img src={logo} alt="Logo" className="homepage-logo" />
            <h1 className="homepage-heading">Welcome to GenBridge ☺️ What's your name?</h1>
            <div className="input-container">
                <input
                    className="name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button className="button" onClick={handleSubmit}>Next</button>
            </div>
        </div>
    );
};

export default HomePage;
