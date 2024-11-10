import React from "react";
import Sidebar from "../objects/Sidebar";
import "../../styles/Album.css";
import "../../index.css";
import {useLocation, useParams} from "react-router-dom";
import monaLisa from "../images/mona-lisa.jpg";
import HeaderAlbum from "../objects/HeaderAlbum";

const albumDetails = {
    "1": [
        { image: monaLisa, title: "Mona Lisa" },
        { image: monaLisa, title: "Mona Lisa" },
        { image: monaLisa, title: "Mona Lisa" },
        { image: monaLisa, title: "Mona Lisa" },
        { image: monaLisa, title: "Mona Lisa" },
        { image: monaLisa, title: "Mona Lisa" },
        { image: monaLisa, title: "Mona Lisa" },
        { image: monaLisa, title: "Mona Lisa" },
    ],
    "2": [
        { image: monaLisa, title: "Starry Night" },
        { image: monaLisa, title: "The Persistence of Memory" },
        { image: monaLisa, title: "The Scream" },
    ],
    "3": [
        { image: monaLisa, title: "Guernica" },
        { image: monaLisa, title: "The Kiss" },
        { image: monaLisa, title: "The Girl with a Pearl Earring" },
    ],
    "4": [
        { image: monaLisa, title: "The Night Watch" },
        { image: monaLisa, title: "Water Lilies" },
        { image: monaLisa, title: "The Birth of Venus" },
    ],
} as const;

type AlbumDetails = typeof albumDetails;

const Album: React.FC = () => {
    const location = useLocation();
    const { albumId } = useParams();
    const images = albumDetails[albumId as keyof AlbumDetails] || [];

    return (
        <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <HeaderAlbum/>
            <div className="content">
                <Sidebar style={{ top: location.pathname.includes("/album") ? "59px" : "100px" }} />

                <div className="album-images2">
                    {images.map((imageDetail, index) => (
                        <div key={index} className="album-image-container">
                        <img
                                src={imageDetail.image}
                                alt={imageDetail.title}
                                className="album-image2"
                            />
                            <div className="image-title">{imageDetail.title}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
}

export default Album;
