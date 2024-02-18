import React from 'react';
import './style.css'; // Make sure your CSS file is imported
import HomePage from "./HomePage";


const HomePageSpeech = () => {
    const speech = true;
    return (
        <HomePage speech={speech}/>
    )
};

export default HomePageSpeech;
