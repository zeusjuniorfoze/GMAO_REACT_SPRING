import React, { useState, useEffect } from 'react';

const TypingAnimation = ({ text, speed = 100, as = 'h1' }) => {
    const [displayedText, setDisplayedText] = useState('');
    const Tag = as; // Dynamically choose the tag

    useEffect(() => {
        let index = 0;
        const typingInterval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text[index]);
                index++;
            } else {
                clearInterval(typingInterval); // Stop the animation once the text is fully displayed
            }
        }, speed);

        return () => clearInterval(typingInterval);
    }, [text, speed]);

    return <Tag>{displayedText}</Tag>; // Use the chosen tag
};

export default TypingAnimation;
