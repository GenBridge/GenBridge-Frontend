import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css'; // Import the same styles as used in HomePage
import logo from './creative-abstract-bridge-logo-design-template-1.png';


const RolePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name } = location.state;

    const handleSubmit = (senior) => {
        navigate('/form', { state: { name: name, senior: senior } });
    };

    return (
        <div className="rolepage-container">
            <img src={logo} alt="Logo" className="rolepage-logo" /> {/* Add the logo image */}
            <h1 className="rolepage-heading">Hello, {name}. Are you a junior or senior?</h1>
            <div className="button-container">
                <button className="button" onClick={() => handleSubmit(false)}>Junior</button>
                <button className="button" onClick={() => handleSubmit(true)}>Senior</button>
            </div>
        </div>
    );
};

export default RolePage;
