import React, {useEffect, useRef, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css'; // Make sure your CSS file is imported
import logo from './creative-abstract-bridge-logo-design-template-1.png';


const HomePage = () => {
    const [name, setName] = useState('');
    const navigate = useNavigate();
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const timeoutIdRef = useRef(null);

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.error("Speech recognition not supported");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true; // Keep listening even after the speech ends
        recognition.interimResults = true; // Show results even if they're not final

        // Event handlers
        recognition.onstart = () => {setListening(true); console.log("started speaking heheheha")};
        recognition.onend = () => {setListening(false); console.log("stopped speaking mimimimi")};

        recognition.onresult = (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
                const transcription = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    setTranscript(transcription);
                    setName(transcription); // Final transcript
                } else {
                    interimTranscript += transcription;
                    setTranscript(interimTranscript); // Update with interim results
                    setName(interimTranscript); // Also update the name to reflect in the input
                }
                console.log(transcription);
            }
        };

        // Start listening
        recognition.start();

        // Stop listening after 5 seconds
        // Set the timeout when recognition actually starts
        timeoutIdRef.current = setTimeout(() => {
            recognition.stop();
            setListening(false);
        }, 5000);

        // Clean up function to stop recognition when component unmounts or stops listening
        return () => {
            recognition.stop();
            clearTimeout(timeoutIdRef.current); // Clear the timeout
            setListening(false);
        };
    }, []);

    const handleSubmit = () => {
        navigate('/role', { state: { name: name } });
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
