import React, {useEffect, useState} from "react";
import "../../styles/HeaderRestoration.css";
import beforeImage from "../images/mona-lisa.jpg";
import HeaderResult from "../objects/HeaderResult";

const Result: React.FC = () => {
    const [beforeImage, setBeforeImage] = useState<string | null>(null);

    useEffect(() => {
        // Get the Before image from localStorage
        const savedBeforeImage = localStorage.getItem('restorationImage');
        if (savedBeforeImage) {
            setBeforeImage(savedBeforeImage);
        }
    }, []);

    return (
        <>
            <HeaderResult/>
            <div className="result-container" style={{marginTop:"40px"}}>
                <div className="image-section">
                    <h2>Before</h2>
                    {beforeImage ? (
                        <img src={beforeImage} alt="Before" className="result-image"/>
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
                <div className="image-section">
                    <h2>After</h2>
                    {beforeImage ? (
                        <img src={beforeImage} alt="After" className="result-image"/>
                    ) : (
                        <p>No image available</p>
                    )}
                </div>
            </div>
        </>

    );
};

export default Result;
