import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Make sure your CSS file is imported
import logo from './creative-abstract-bridge-logo-design-template-1.png';
import useSpeechRecognition from "./useSpeechRecognition";

const HomePage = ({speech}) => {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const speechTimeoutIdRef = useRef(null);
    const transcript = useSpeechRecognition(speech, speechTimeoutIdRef);

    useEffect(() => {
        setName(transcript); // Update name based on transcript change
        return () => {};
    }, [transcript]);

    const handleSubmit = () => {
        navigate('/role', { state: { name: name, speech: speech, speechTimeoutIdRef: speechTimeoutIdRef } });
    };

    return (
        <div className="homepage-container">
            <img src={logo} alt="Logo" className="homepage-logo" />
            <h1 className="homepage-heading">Welcome to GenBridge ☺️ What's your name?</h1>
            <div className="input-container">
                <input
                    className="name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <button className="button" onClick={handleSubmit}>Next</button>
            </div>
        </div>
    );
};

export default HomePage;
