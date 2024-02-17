import React from 'react';
import { useLocation } from 'react-router-dom';

const MatchPage = () => {
    const location = useLocation();
    const { name, role } = location.state;

    return (
        <div>
            <h1>You have been matched with...</h1>
            <p>Name: {name}</p>
            <p>Role: {role}</p>
            {/* Display other info here */}
        </div>
    );
};

export default MatchPage;
