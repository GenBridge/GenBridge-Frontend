import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

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
        <div>
            <h1>You have been matched with...</h1>
            {result ? (
                <>
                    <p>Name: {result.user.name}</p>
                    {/* Add more properties as needed */}
                    return (
                    <div>
                        <h1>Calendly Meeting</h1>
                        {result.user.calendly ? (
                            <iframe
                                src={result.user.calendly}
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
                </>
            ) : (
                <p>No match found</p>
            )}
        </div>
    );
};

export default MatchPage;
