import {useEffect, useRef, useState} from "react";

const useSpeechRecognition = (speech, duration=5) => {
    const [listening, setListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const timeoutIdRef = useRef(null);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    useEffect(() => {
        if (!speech) {
            console.log("Speech recognition disabled");
            return;
        }
        if (!SpeechRecognition) {
            console.error("Speech recognition not supported");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true; // Keep listening even after the speech ends
        recognition.interimResults = true; // Show results even if they're not final

        recognition.onstart = () => {
            setListening(true);
            console.log("started listening");
            // Move the setTimeout call here
            timeoutIdRef.current = setTimeout(() => {
                recognition.stop();
                setListening(false);
            }, duration*1000);
        };
        recognition.onend = () => {
            setListening(false);
            console.log("stopped listening")
        };

        recognition.onresult = (event) => {
            let interimTranscript = '';
            for (let i = event.resultIndex, len = event.results.length; i < len; i++) {
                const transcription = event.results[i][0].transcript;
                if (event.results[i].isFinal) {
                    setTranscript(transcription);
                    //setName(transcription); // Final transcript
                } else {
                    interimTranscript += transcription;
                    setTranscript(interimTranscript); // Update with interim results
                    //setName(interimTranscript); // Also update the name to reflect in the input
                }
                console.log(transcription);
            }
        };

        // Start listening
        recognition.start();

        return () => {
            if (recognition) {
                recognition.stop();
            }
            if (timeoutIdRef.current) {
                clearTimeout(timeoutIdRef.current);
            }
        };
    }, [speech]);
    return {transcript, listening};
}

export default useSpeechRecognition;