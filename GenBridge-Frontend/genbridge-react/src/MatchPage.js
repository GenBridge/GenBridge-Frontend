import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import logo from './creative-abstract-bridge-logo-design-template-1.png';
import './style.css'; // Import your CSS styles

// Page for Seniors
const MatchPage = () => {
    const location = useLocation();
    const { name, senior, interests, speech } = location.state; // Destructure the needed data
    let calendly = ""
    const [calendlyLink, setCalendlyLink] = useState('https://calendly.com/justusbeck/30min?back=1&month=2024-02 ');
    const [listening, setListening] = useState(false);

    // Initialize state to store the fetched result
    const [result, setResult] = useState(null);


    const speak = (text, callback) => {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.onend = callback;
        speechSynthesis.speak(utterance);
    };

    const handleIframeLoad = () => {
        // Check if the current iframe is the confirmation page
        if (calendlyLink.includes('./confirmation')) {
            // Trigger the speech synthesis message
            speak("Your meeting has been scheduled successfully.", () => {
                console.log("Confirmation message spoken.");
            });
        }
    };

    // This function starts listening for the user's response
    const listenForConfirmation = (callback) => {
        console.log("listening for confirmation")
        const recognition = new window.webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.continuous = true; // Keep listening even after the speech ends
        recognition.start();

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript.trim().toLowerCase();
            console.log("Done listening. Transcript: ", transcript)
            callback(transcript);
        };
    };

    const confirmTime = (transcript) => {
        if (transcript.toLowerCase().includes('yes')) {
            setCalendlyLink('./confirmation');
        } else {
            // Handle 'no' or other responses accordingly
        }
    };

    const confirmDate = (transcript) => {
        if (transcript.toLowerCase().includes('yes')) {
            setCalendlyLink('https://calendly.com/justusbeck/30min?back=1&month=2024-02&date=2024-02-19');
            setTimeout(() => {
                speak('Is 9am fine for you?', () => listenForConfirmation(confirmTime));
            }, 3000); // Delay the speech for 3 seconds        } else {
            // Handle 'no' or other responses accordingly
        }
    };

    useEffect(() => {
        // Only perform the database entry if senior is true
        async function fetchData() {
            try {
                const response = await fetch('https://genbridge-413824882f14.herokuapp.com/match/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ name, senior, interests, calendly }),
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                console.log(result);
                // Store the fetched result in state
                setResult(result);
            } catch (error) {
                console.error('There was an error!', error);
            }
        }
        fetchData();
        if (speech && !listening) {
            setTimeout(() => {
                speak( "You have been matched for a call with Peter. The first slot is on Monday, February 19th. Do you have time on that day?", () => listenForConfirmation(confirmDate));
            }, 3000);        setListening(true);
        }
    }, [name, senior, interests]);

    return (
        <div className="page-container">
            <h1 className="page-heading">You have been matched with...</h1>
            {result ? (
                <>
                    <p className="match-details">{"Peter"}</p>
                    <div className="calendly-container">
                        <h1 className="page-subheading">Schedule a Call here:</h1>
                        <iframe
                            className="calendly-iframe"
                            src={calendlyLink}
                            onLoad={handleIframeLoad}
                            frameBorder="0"
                            title="Calendly"
                        ></iframe>
                    </div>
                </>
            ) : (
                <p className="no-match">No match found</p>
            )}
        </div>
    );
};


export default MatchPage;