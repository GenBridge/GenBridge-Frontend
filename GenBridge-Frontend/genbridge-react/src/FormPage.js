import React, {useEffect, useRef, useState} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from './creative-abstract-bridge-logo-design-template-1.png';
import './style.css';
import useSpeechRecognition from "./useSpeechRecognition"; // Import your CSS styles

const FormPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, senior, speech } = location.state;

    // State for form answers
    const [answer1, setAnswer1] = useState('');

    const speechTimeoutIdRef = useRef(null);

    // Destructure `isListening` if your hook provides it, to better control the flow
    const { transcript, isListening } = useSpeechRecognition(speech, 10);

    useEffect(() => {
        setAnswer1(transcript); // Update name based on transcript change
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
                handleSubmit();
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
        const interests = [answer1];
        // Check if the user is a senior
        if (senior) {
            // If senior, navigate to MatchPage with the collected data
            navigate('/match', { state: { name, senior, interests, speech } });
        } else {
            // If not a senior (thus, a junior), navigate to EnterCalendlyLinkPage
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
