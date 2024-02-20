import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import logo from './creative-abstract-bridge-logo-design-template-1.png';
import useSpeechRecognition from "./useSpeechRecognition";

const HomePage = ({ speech = false }) => {
    const [name, setName] = useState('');
    const [spoken, setSpoken] = useState(false); // New state to track if the initial speech has been spoken
    const navigate = useNavigate();
    const speechTimeoutIdRef = useRef(null);
    const { transcript, isListening } = useSpeechRecognition(speech && spoken); // Start listening only if spoken is true

    const speak = (text, callback) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = () => {
            setSpoken(true); // Set spoken to true when speech synthesis is finished
            if (typeof callback === "function") callback(); // Call additional callback if provided
        };
        speechSynthesis.speak(utterance);
    };

    useEffect(() => {
        // Trigger initial speech when the component mounts
        if (speech && !spoken) {
            speak("Welcome to GenBridge.️ What's your name?");
        }
    }, [speech, spoken]); // Dependency on 'spoken' ensures this effect doesn't re-run after the initial speech

    useEffect(() => {
        setName(transcript); // Update name based on transcript change
    }, [transcript]);

    useEffect(() => {
        if (!isListening && transcript && speech && spoken) {
            if (speechTimeoutIdRef.current) {
                clearTimeout(speechTimeoutIdRef.current);
            }
            speechTimeoutIdRef.current = setTimeout(() => {
                navigate('/role', { state: { name, speech } });
            }, 2000);
        }

        return () => {
            if (speechTimeoutIdRef.current) {
                clearTimeout(speechTimeoutIdRef.current);
            }
        };
    }, [isListening, transcript, speech, navigate, name, spoken]);

    const handleSubmit = () => {
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
