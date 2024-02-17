import React from 'react';
import { useLocation } from 'react-router-dom';

const DisplayCalendlyPage = () => {
    const location = useLocation();
    const { calendlyLink } = location.state || {}; // Default to an empty object if state is undefined

    return (
        <div>
            <h1>Calendly Meeting</h1>
            {calendlyLink ? (
                <iframe
                    src={calendlyLink}
                    width="100%"
                    height="600px"
                    frameBorder="0"
                    title="Calendly"
                ></iframe>
            ) : (
                <p>No Calendly link provided</p>
            )}
        </div>
    );
};

export default DisplayCalendlyPage;
