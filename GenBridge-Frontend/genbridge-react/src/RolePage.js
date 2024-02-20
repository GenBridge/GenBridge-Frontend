import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css';
import logo from './creative-abstract-bridge-logo-design-template-1.png';
import useSpeechRecognition from "./useSpeechRecognition";

const RolePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, speech, speechTimeoutIdRef } = location.state;
    const [spoken, setSpoken] = useState(false); // State to track if the initial speech has been spoken
    const { transcript, listening } = useSpeechRecognition(speech && spoken); // Start listening after speech

    useEffect(() => {
        // Function to handle speech synthesis
        const speak = (text, callback) => {
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.onend = callback;
            speechSynthesis.speak(utterance);
        };

        // Trigger initial speech when the component mounts and speech is enabled
        if (speech && !spoken) {
            speak(`Hello, ${name}. Are you a junior or senior?`, () => setSpoken(true));
        }
    }, [speech, spoken, name]);

    useEffect(() => {
        if (speech && transcript) {
            let distSenior = levenshteinDistance(transcript.trim().toLowerCase(), "senior");
            let distJunior = levenshteinDistance(transcript.trim().toLowerCase(), "junior");
            let senior = true; //distSenior < distJunior;
            console.log("senior: "+senior, "transcript:", transcript);
            handleSubmit(senior);
        }
    }, [transcript, speech]);

    const handleSubmit = (senior) => {
        navigate('/form', { state: { name, senior, speech } });
    };

    return (
        <div className="rolepage-container">
            <img src={logo} alt="Logo" className="rolepage-logo" />
            <h1 className="rolepage-heading">Hello, {name}. Are you a junior or senior?</h1>
            <div className="button-container">
                <button className="button" onClick={() => handleSubmit(false)}>Junior</button>
                <button className="button" onClick={() => handleSubmit(true)}>Senior</button>
            </div>
        </div>
    );
};

export default RolePage;

function levenshteinDistance(a, b) {
    const matrix = [];

    // Increment along the first column of each row.
    for (let i = 0; i <= b.length; i++) {
        matrix[i] = [i];
    }

    // Increment each column in the first row.
    for (let j = 0; j <= a.length; j++) {
        matrix[0][j] = j;
    }

    // Fill in the rest of the matrix.
    for (let i = 1; i <= b.length; i++) {
        for (let j = 1; j <= a.length; j++) {
            if (b.charAt(i - 1) === a.charAt(j - 1)) {
                matrix[i][j] = matrix[i - 1][j - 1];
            } else {
                matrix[i][j] = Math.min(
                    matrix[i - 1][j - 1] + 1, // Substitution
                    matrix[i][j - 1] + 1, // Insertion
                    matrix[i - 1][j] + 1 // Deletion
                );
            }
        }
    }

    return matrix[b.length][a.length];
}
