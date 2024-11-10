import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import monaLisa from "../images/mona-lisa.jpg";

import "../../styles/Home.css";
import Header from "../objects/Header";
import Navbar from "../objects/Navbar";
import Sidebar from "../objects/Sidebar";
import DragAndDrop from "../objects/DragAndDrop";

interface HomeProps {
    setUploadedImage: (image: string | null) => void; // Define the prop type
}

const Home: React.FC<HomeProps> = ({ setUploadedImage }) => {
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);

    const handleFileUpload = (file: File | null) => {
        setUploadedFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result as string); // Set the uploaded image
            };
            reader.readAsDataURL(file);
        }
    };

    const navigate = useNavigate();
    const handleNextStep = () => {
        if (!uploadedFile) {
            alert("Please upload a valid image file (PNG or JPG) before proceeding.");
        } else {
            navigate('/restoration');
        }
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <Navbar />
            <div className="content" style={{ display: "flex", flex: 1 }}>
                <Sidebar />
                <div style={{ display: "flex", flex: 1, padding: "30px 40px", paddingLeft:"40px"}}>
                    <div style={{ flex: "0 0 70%", paddingTop: "30px" }}>
                        <div className="text-main">
                            Image restoration has never been easier! Select a damaged area of the photograph, and
                            advanced machine learning and artificial intelligence algorithms will take care of
                            completing it while preserving the original details.
                        </div>
                        <div className="text-main" style={{ paddingTop: "30px" }}>
                            Upload the desired image by dragging and dropping it into the area below to start the restoration process.
                        </div>
                        <div style={{ paddingTop: "20px", marginRight: "50px" }}>
                            <DragAndDrop onFileUpload={handleFileUpload} />
                        </div>

                        <button onClick={handleNextStep} className="next-step-button">
                            Next Step →
                        </button>
                    </div>

                    <div style={{ flex: "0 0 30%" }}>
                        <img
                            src={monaLisa}
                            alt="Descriere imagine"
                            style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
