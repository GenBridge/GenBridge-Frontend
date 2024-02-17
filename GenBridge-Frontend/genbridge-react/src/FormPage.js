import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const FormPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, role } = location.state;

    // State for form answers
    const [answer1, setAnswer1] = useState('');
    const [answer2, setAnswer2] = useState('');

    const handleSubmit = () => {
        // Here we collect the answers and pass them as formData
        const formData = { question1: answer1, question2: answer2 };
        navigate('/match', { state: { name, role, ...formData } });
    };

    return (
        <div>
            <h1>Some questions for you</h1>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <div>
                    <label htmlFor="question1">What is your favorite color?</label>
                    <input
                        id="question1"
                        type="text"
                        value={answer1}
                        onChange={(e) => setAnswer1(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="question2">What is your hobby?</label>
                    <input
                        id="question2"
                        type="text"
                        value={answer2}
                        onChange={(e) => setAnswer2(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FormPage;
