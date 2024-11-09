import React from "react";
import Header from "../objects/Header";
import Navbar from "../objects/Navbar";
import Sidebar from "../objects/Sidebar";
import "../../styles/AllAlbums.css";
import "../../index.css";
import monaLisa from "../images/mona-lisa.jpg";
import {useNavigate} from "react-router-dom";
const albums = [
    { id: "1", title: "Vacation 2021", image: monaLisa },
    { id: "2", title: "Family Memories", image: monaLisa },
    { id: "3", title: "Graduation Day", image: monaLisa },
    { id: "4", title: "Wedding Photos", image: monaLisa },
];

const AllAlbums: React.FC = () => {
    const navigate = useNavigate();
    const handleAlbumClick = (albumId: string, albumTitle: string) => {
        navigate(`/album/${albumId}/${albumTitle}`);
    };
    return (
        <div style={{display: "flex", flexDirection: "column", minHeight: "100vh"}}>
            <Header/>
            <Navbar/>

            <div className="content">
                <Sidebar/>

                <div className="page-title">
                    Albums
                </div>

                <div style={{display: "flex", flex: 1}}>
                    <div className="album-container">

                        {albums.map((album, index) => (
                            <div className="album-card" key={album.id} onClick={() => handleAlbumClick(album.id, album.title)}>
                                <img src={album.image} alt={album.title} className="album-image"/>
                                <div className="album-title">{album.title}</div>
                            </div>
                        ))}
                    </div>
                </div>


            </div>
        </div>

    );
}

export default AllAlbums;
