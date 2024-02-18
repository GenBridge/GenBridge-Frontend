import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from './creative-abstract-bridge-logo-design-template-1.png';
import './style.css'; // Import your CSS styles

// Page for Seniors
const MatchPage = () => {
    const location = useLocation();
    const { name, senior, interests } = location.state; // Destructure the needed data
    let calendly = ""

    // Initialize state to store the fetched result
    const [result, setResult] = useState(null);

    useEffect(() => {
        // Only perform the database entry if senior is true
        async function fetchData() {
            try {
                const response = await fetch('https://genbridge-413824882f14.herokuapp.com/match/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, senior, interests, calendly }),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log(result);
                // Store the fetched result in state
                setResult(result);
            } catch (error) {
                console.error('There was an error!', error);
            }
        }
        fetchData();
    }, [name, senior, interests]);

    return (
        <div className="page-container">
            <img src={logo} alt="Logo" className="page-logo" />
            <h1 className="page-heading">You have been matched with...</h1>
            {result ? (
                <>
                    <p className="match-details">{result.user.name}</p>
                    {/* Add more details with similar styling as match-details */}
                    <div className="calendly-container">
                        <h1 className="page-subheading">Schedule a Call here:</h1>
                        {result.user.calendly ? (
                            <iframe
                                className="calendly-iframe"
                                src={result.user.calendly}
                                frameBorder="0"
                                title="Calendly"
                            ></iframe>
                        ) : (
                            <p className="no-calendly">No Calendly link provided</p>
                        )}
                    </div>
                </>
            ) : (
                <p className="no-match">No match found</p>
            )}
        </div>
    );
};

export default MatchPage;
