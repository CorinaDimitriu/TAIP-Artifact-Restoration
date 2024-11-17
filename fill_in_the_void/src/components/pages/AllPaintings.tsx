import React, { useState } from "react";
import Header from "../objects/Header";
import Navbar from "../objects/Navbar";
import Sidebar from "../objects/Sidebar";
import Drawer from "../objects/Drawer";
import "../../styles/AllPaintings.css";
import "../../index.css";
import monaLisa from "../images/mona-lisa.jpg";
// import {useNavigate} from "react-router-dom";


const paintingsData = [
    {id: "1", title: "Mona Lisa", author: "Leonardo da Vinci", description: "asdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdsdThe Mona Lisa is a painting by Leonardo da Vinci.", image: monaLisa},
    {id: "2", title: "The Persistence of Memory", author: "Salvador Dali", description: "The Persistence of Memory is a painting by Salvador Dali.", image: monaLisa},
    {id: "3", title: "The Scream", author: "Edvard Munch", description: "The Scream is a painting by Edvard Munch.", image: monaLisa},
    {id: "4", title: "The Kiss", author: "Salvador Dali", description: "The Kiss is a painting by Salvador Dali.", image: monaLisa},
    {id: "5", title: "The Birth of Venus", author: "Leonardo da Vinci", description: "The Birth of Venus is a painting by Leonardo da Vinci.", image: monaLisa},
    {id: "6", title: "Mona Lisa", author: "Leonardo da Vinci", description: "The Mona Lisa is a painting by Leonardo da Vinci.", image: monaLisa}
]

const AllPaintings: React.FC = () => {
    // const navigate = useNavigate();
    // // const handlePaintingClick = (paintingId: string, paintingTitle: string) => {
    // //     navigate(`/painting/${paintingId}/${paintingTitle}`);
    // // };

    const [paintings, setPaintings] = useState(paintingsData); // Lista de picturi
    const [selectedPainting, setSelectedPainting] = useState(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const handlePaintingClick = (painting: any) => {
        setSelectedPainting(painting);
        setIsDrawerOpen(true);
    };

    const closeDrawer = () => {
        setIsDrawerOpen(false);
        setSelectedPainting(null);
    };

    const updatePainting = (updatedPainting: any) => {
        setPaintings((prevPaintings) =>
            prevPaintings.map((painting) =>
                painting.id === updatedPainting.id ? updatedPainting : painting
            )
        );
    };
    return (
        <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <Header/>
            <Navbar/>

            <div className="content">
                <Sidebar/>

                <div className="page-title">
                    Paintings
                </div>

                <div style={{display: "flex", flex: 1}}>
                    <div className="paintings-container"> {paintings.map((painting, index) => (
                        <div className="painting-card" key={painting.id} onClick={() => handlePaintingClick(painting)}>
                            <img src={painting.image} alt={painting.title} className="painting-image"/>
                            <div className="painting-title">{painting.title}</div>
                        </div>
                    ))}
                    </div>
                </div>

                <Drawer
                    isOpen={isDrawerOpen}
                    onClose={closeDrawer}
                    painting={selectedPainting}
                    onUpdatePainting={updatePainting}
                />
            </div>
        </div>
    );
};

export default AllPaintings;