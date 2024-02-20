import React, { useEffect, useState, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from './creative-abstract-bridge-logo-design-template-1.png';
import './style.css';
import useSpeechRecognition from "./useSpeechRecognition";

const FormPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, senior, speech } = location.state;
    const [answer1, setAnswer1] = useState('');
    const [spoken, setSpoken] = useState(false); // State to track if initial speech has been spoken
    const speechTimeoutIdRef = useRef(null);
    const { transcript, isListening } = useSpeechRecognition(speech && spoken); // Start listening after speech

    useEffect(() => {
        // Function to handle speech synthesis
        const speak = (text, callback) => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.onend = callback;
            speechSynthesis.speak(utterance);
        };

        // Trigger initial speech when the component mounts and speech is enabled
        if (speech && !spoken) {
            speak("What do you do for fun?", () => setSpoken(true));
        }
    }, [speech, spoken]);

    useEffect(() => {
        setAnswer1(transcript); // Update answer based on transcript change
    }, [transcript]);

    useEffect(() => {
        // Check if speech recognition has stopped, transcript is available, and initial speech has been spoken
        if (!isListening && transcript && speech && spoken) {
            if (speechTimeoutIdRef.current) {
                clearTimeout(speechTimeoutIdRef.current);
            }
            speechTimeoutIdRef.current = setTimeout(() => {
                handleSubmit();
            }, 2000);
        }

        return () => {
            if (speechTimeoutIdRef.current) {
                clearTimeout(speechTimeoutIdRef.current);
            }
        };
    }, [isListening, transcript, speech, navigate, name, spoken]);

    const handleSubmit = () => {
        const interests = [answer1];
        if (senior) {
            navigate('/match', { state: { name, senior, interests, speech } });
        } else {
            navigate('/enter-calendly', { state: { name, senior, interests } });
        }
    };

    return (
        <div className="formpage-container">
            <img src={logo} alt="Logo" className="formpage-logo" />
            <h1 className="formpage-heading">Some questions for you</h1>
            <form onSubmit={handleSubmit} className="formpage-form">
                <div className="form-group">
                    <label htmlFor="question1" className="form-label">What do you do for fun?</label>
                    <input
                        id="question1"
                        type="text"
                        value={answer1}
                        onChange={(e) => setAnswer1(e.target.value)}
                        className="form-input"
                    />
                </div>
                <button className="button" type="submit">Submit</button>
            </form>
        </div>
    );
};

export default FormPage;
