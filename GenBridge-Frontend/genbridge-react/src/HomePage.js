import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/role', { state: { name: name } });
    };

    return (
        <div>
            <h1>What's your name?</h1>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <button onClick={handleSubmit}>Next</button>
        </div>
    );
};

export default HomePage;
