import React, {useState} from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CameraRoom from './components/room/CameraRoom';
import Restoration from "./components/pages/Restoration";
import Home from "./components/pages/Home";

function App() {
    const [uploadedImage, setUploadedImage] = useState<string | null>(null); // State to hold uploaded image

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home setUploadedImage={setUploadedImage} />} />
                <Route path="/restoration" element={<Restoration uploadedImage={uploadedImage} />} />
            </Routes>
        </Router>
    );
}

export default App;