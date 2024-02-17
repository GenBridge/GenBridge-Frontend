import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EnterCalendlyLinkPage = () => {
    const [calendlyLink, setCalendlyLink] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate('/display-calendly', { state: { calendlyLink } });
    };

    return (
        <div>
            <h1>Enter Your Calendly Link</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={calendlyLink}
                    onChange={(e) => setCalendlyLink(e.target.value)}
                    placeholder="Enter your Calendly URL"
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default EnterCalendlyLinkPage;
