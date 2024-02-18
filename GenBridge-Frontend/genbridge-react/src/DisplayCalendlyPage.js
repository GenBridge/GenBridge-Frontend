import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import ConfirmationPage from './ConfirmationPage'; // Make sure this path is correct

const CalendlyMeeting = () => {
    const [calendlyLink, setCalendlyLink] = useState('https://calendly.com/justusbeck/30min?back=1&month=2024-02 ');
    const [listening, setListening] = useState(false);

    // This function handles the speech synthesis
    const speak = (text, callback) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = callback;
        speechSynthesis.speak(utterance);
    };

    // This function starts listening for the user's response
    const listenForConfirmation = (callback) => {
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.trim().toLowerCase();
            callback(transcript);
        };
    };

    const confirmTime = (transcript) => {
        if (transcript === 'yes') {
            setCalendlyLink('./confirmation');
        } else {
            // Handle 'no' or other responses accordingly
        }
    };

    const confirmDate = (transcript) => {
        if (transcript === 'yes') {
            setCalendlyLink('https://calendly.com/justusbeck/30min?back=1&month=2024-02&date=2024-02-19');
            setTimeout(() => {
                speak('Is 9am fine for you?', () => listenForConfirmation(confirmTime));
            }, 3000); // Delay the speech for 3 seconds        } else {
            // Handle 'no' or other responses accordingly
        }
    };

    // Start the voice interaction when the component mounts
    if (!listening) {
        setTimeout(() => {
            speak("The first slot is on Monday, February 19th. Do you have time on that day?", () => listenForConfirmation(confirmDate));
        }, 3000);        setListening(true);
    }

    return (
        <div>
            <h1>Calendly Meeting</h1>
            {calendlyLink ? (
                <iframe
                    src={calendlyLink}
                    width="100%"
                    height="600px"
                    frameBorder="0"
                    title="Calendly"
                ></iframe>
            ) : (
                <p>No Calendly link provided</p>
            )}
        </div>
    );
};

export default CalendlyMeeting;
