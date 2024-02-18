import React, {useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './style.css'; // Import the same styles as used in HomePage
import logo from './creative-abstract-bridge-logo-design-template-1.png';
import useSpeechRecognition from "./useSpeechRecognition";

const RolePage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { name, speech, speechTimeoutIdRef } = location.state;
    const transcript = useSpeechRecognition(speech, speechTimeoutIdRef);

    console.log("role " +speech.toString()+" "+ transcript);

    useEffect(() => {
        if (speech && transcript) { // Only proceed if transcript is not empty
            let distSenior = levenshteinDistance(transcript.toLowerCase(), "senior");
            let distJunior = levenshteinDistance(transcript.toLowerCase(), "junior");
            let senior = distSenior < distJunior;
            console.log("senior: "+senior, "transcript:", transcript);
            handleSubmit(senior);
        }
    }, [transcript]);

    const handleSubmit = (senior) => {
        navigate('/form', { state: { name: name, senior: senior } });
    };

    return (
        <div className="rolepage-container">
            <img src={logo} alt="Logo" className="rolepage-logo" /> {/* Add the logo image */}
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
