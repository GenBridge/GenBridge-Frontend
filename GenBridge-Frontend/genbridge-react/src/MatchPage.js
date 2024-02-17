import React, {useEffect, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const MatchPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const data = location.state;

    // Initialize state to store the fetched result
    const [result, setResult] = useState(null);

    useEffect(() => {
        async function fetchData(data) {
            try {
                const response = await fetch('https://genbridge-413824882f14.herokuapp.com/signup/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
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
        fetchData(data);
    }, [data]);

    const redirectToCalendlyLinkPage = () => {
        navigate('/enter-calendly');
    };

    return (
        <div>
            <h1>You have been matched with...</h1>
            {/* Ensure `result` is not null before trying to access its properties */}
            {result ? (
                <>
                    <p>Name: {result.match.user.name}</p>
                    <p>Role: {result.match.user.senior ? 'Senior' : 'Junior'}</p>
                    {/* Add more properties as needed */}

                    <button onClick={redirectToCalendlyLinkPage}>Enter Calendly Link</button> {}
                </>
            ) : (
                <p>Loading...</p> // Display loading text or spinner while waiting for the fetch to complete
            )}
        </div>
    );
};

export default MatchPage;
