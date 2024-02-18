import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Make sure your CSS file is imported
import logo from './creative-abstract-bridge-logo-design-template-1.png';
import useSpeechRecognition from "./useSpeechRecognition";

const HomePage = ({speech = false }) => {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const speechTimeoutIdRef = useRef(null);

    // Destructure `isListening` if your hook provides it, to better control the flow
    const { transcript, isListening } = useSpeechRecognition(speech);

    useEffect(() => {
        setName(transcript); // Update name based on transcript change
    }, [transcript]);

    useEffect(() => {
        // Check if speech recognition has stopped and transcript is available
        if (!isListening && transcript && speech) {
            // Clear any existing timeout to ensure we don't navigate multiple times
            if (speechTimeoutIdRef.current) {
                clearTimeout(speechTimeoutIdRef.current);
            }

            // Wait for 2 seconds, then navigate
            speechTimeoutIdRef.current = setTimeout(() => {
                navigate('/role', { state: { name, speech } });
            }, 2000);
        }

        // Cleanup timeout on component unmount
        return () => {
            if (speechTimeoutIdRef.current) {
                clearTimeout(speechTimeoutIdRef.current);
            }
        };
    }, [isListening, transcript, speech, navigate, name]);

    const handleSubmit = () => {
        // Manually handle submit when not using speech or before speech input is finished
        if (!speech || !transcript) {
            navigate('/role', { state: { name, speech } });
        }
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
