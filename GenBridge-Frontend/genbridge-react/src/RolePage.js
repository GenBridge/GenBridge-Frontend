import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RolePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name } = location.state;

    const handleSubmit = (senior) => {
        navigate('/form', { state: { name: name, senior: senior } });
    };

    return (
        <div>
            <h1>Hello, {name}. Are you a junior or senior?</h1>
            <button onClick={() => handleSubmit(false)}>Junior</button>
            <button onClick={() => handleSubmit(true)}>Senior</button>
        </div>
    );
};

export default RolePage;
