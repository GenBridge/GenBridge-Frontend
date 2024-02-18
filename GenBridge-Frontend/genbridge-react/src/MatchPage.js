import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MatchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, senior, interests } = location.state; // Destructure the needed data

    // Initialize state to store the fetched result
    const [result, setResult] = useState(null);

    useEffect(() => {
        // Only perform the database entry if senior is true
        if (senior) {
            async function fetchData() {
                try {
                    const response = await fetch('https://genbridge-413824882f14.herokuapp.com/signup/', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ name, senior, interests }),
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
        }
    }, [name, senior, interests]);

    const handleRedirect = () => {
        if (senior) {
            // Redirect somewhere else if senior is true
            navigate('/some-other-page', { state: { name, senior, interests } });
        } else {
            // Redirect to enter Calendly link page if senior is false
            navigate('/enter-calendly', { state: { name, senior, interests } });
        }
    };

    return (
        <div>
            <h1>You have been matched with...</h1>
            {senior && result ? (
                <>
                    <p>Name: {result.match.user.name}</p>
                    <p>Role: Senior</p>
                    {/* Add more properties as needed */}
                    <button onClick={handleRedirect}>Proceed</button> {/* Redirect based on condition */}
                </>
            ) : (
                <>
                    <p>Name: {name}</p>
                    <p>Role: Junior</p>
                    {/* Since no database entry, directly use state */}
                    <button onClick={handleRedirect}>Enter Calendly Link</button>
                </>
            )}
        </div>
    );
};

export default MatchPage;
