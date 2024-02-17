import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RolePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name } = location.state;

    const handleSubmit = (role) => {
        navigate('/form', { state: { name: name, role: role } });
    };

    return (
        <div>
            <h1>Hello, {name}. Are you a junior or senior?</h1>
            <button onClick={() => handleSubmit('Junior')}>Junior</button>
            <button onClick={() => handleSubmit('Senior')}>Senior</button>
        </div>
    );
};

export default RolePage;
