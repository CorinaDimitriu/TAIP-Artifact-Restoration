import React, {useEffect, useState} from "react";
import Header from "../objects/Header";
import Navbar from "../objects/Navbar";
import Sidebar from "../objects/Sidebar";
import "../../styles/AllAlbums.css";
import "../../index.css";
import monaLisa from "../images/mona-lisa.jpg";
import {useNavigate, useParams} from "react-router-dom";
import DrawerAddAlbum from "../objects/DrawerAddAlbum";
import {jwtDecode} from "jwt-decode";

interface UserToken {
    sub: string;
    iat: number;
    exp: number;
}


// const albumsData = [
//     { id: "1", title: "Vacation 2021", image: monaLisa, description:"cel mai fain" },
//     { id: "2", title: "Family Memories", image: monaLisa, description:"cel mai fain" },
//     { id: "3", title: "Graduation Day", image: monaLisa, description:"cel mai fain" },
//     { id: "4", title: "Wedding Photos", image: monaLisa, description:"cel mai fain" },
// ];

interface Album {
    galleryName: string;
    description: string;
    image?: string;
}

const AllAlbums: React.FC = () => {
    const [email, setEmail] = useState('');

    const [albums, setAlbums] = useState<Album[]>([]);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false); 
    const [newAlbumTitle, setNewAlbumTitle] = useState('');
    const [newAlbumDescription, setNewAlbumDescription] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        const updateLastNameFromToken = () => {
            if (token) {
                const decodedToken = jwtDecode(token) as UserToken;
                const email = decodedToken.sub;
                setEmail(email);
                fetchAlbums(email);
                // fetchFirstName(decodedToken.sub);
            }
        };

        updateLastNameFromToken();

        const handleStorageChange = () => {
            updateLastNameFromToken();
        };

        window.addEventListener('storage', handleStorageChange);

        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const fetchAlbums = async (email: string) => {

        const token = localStorage.getItem("token");
        const headers = { 'Authorization': `Bearer ${token}` };
        fetch(`http://localhost:8080/api/v1/gallery/findAllByOwner?email-user=${encodeURIComponent(email)}`, { headers })
            .then(response => response.json())
            .then(data => setAlbums(data));
    };

    const handleAlbumClick = (albumTitle: string) => {
        navigate(`/album/${albumTitle}`);
    };

    const handleCreateAlbum = (title: string, description: string) => {
        const newAlbum = {
            galleryName: title,
            description,
            image: monaLisa,
        };
        setAlbums([...albums, newAlbum]);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
            <Header />
            <Navbar />

            <div className="content">
                <Sidebar />

                <div className="page-header">
                    <button className="add-painting-btn select" onClick={() => setIsDrawerOpen(true)}>Create album</button>
                    <div className="page-title2">Albums</div>
                </div>

                <div style={{ display: "flex", flex: 1 }}>
                    <div className="album-container">
                        {albums.map((album, index) => (
                            <div className="album-card" key={index} onClick={() => handleAlbumClick(album.galleryName)}>
                                <img src={album.image || monaLisa} alt={album.galleryName} className="album-image" />
                                <div className="album-title">{album.galleryName}</div>
                                <div className="description-album">
                                    <b>Description:</b>{album.description}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <DrawerAddAlbum
                isOpen={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                albums={albums}
                onCreateAlbum={handleCreateAlbum}
                newAlbumTitle={newAlbumTitle}
                setNewAlbumTitle={setNewAlbumTitle}
                newAlbumDescription={newAlbumDescription}
                setNewAlbumDescription={setNewAlbumDescription}
            />
        </div>
    );
};

export default AllAlbums;