import React, {useEffect} from 'react';
import { useLocation } from 'react-router-dom';

const MatchPage = () => {
    const location = useLocation();
    const data = location.state;

    useEffect(() => {
        // Sign up
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
            } catch (error) {
                console.error('There was an error!', error);
            }
        }

        fetchData(data);
    },[]);

    return (
        <div>
            <h1>You have been matched with...</h1>
            <p>Name: {data.name}</p>
            <p>Role: {data.senior}</p>
        </div>
    );
};

export default MatchPage;
