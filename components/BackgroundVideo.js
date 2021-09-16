import React from 'react'
import { useState } from 'react'
import { styles } from '../styles/styles.js';

export const BackgroundVideo = () => {
    const [isLoading, setIsLoading] = useState(false)

    return (
        <video
            autoPlay
            muted
            loop
            style={{
                position: "fixed",
                zIndex: -10,
                left: 0,
                top: 0,
                opacity: isLoading ? 0 : 1,
                transition: "opacity, 2s ease-in-out",
                width: "100%",
                height: "100%",
                objectFit: "cover",
            }}
        >
            <source src="video1.mp4" type="video/mp4" /> 
            {/* https://www.pexels.com/video/glowing-cubes-7832341/ */}
        </video>
    )
}