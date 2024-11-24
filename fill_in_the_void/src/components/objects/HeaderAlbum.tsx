import React from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { FaRegEye } from "react-icons/fa";
import { IoMenu } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { IoIosAdd } from "react-icons/io";
import "../../styles/Album.css";

const HeaderAlbum: React.FC = () => {
    const navigate = useNavigate();
    const { albumId, albumTitle } = useParams();


    const goBack = () => {
        navigate("/all-albums");
    };

    const goTo3DView = () => {
        // Navigare către CameraRoom folosind doar albumId
        navigate(`/3d-view/${albumId}`);
    };

    return (
        <div className="header-container">

            <div style={{display:"flex"}}>
                <button className="back-button" onClick={goBack}>
                    <IoArrowBackOutline style={{fontSize: "18px", marginRight: "6px"}}/>
                    Back to Albums
                </button>
                <button className="back-button" style={{backgroundColor:"red"}}>
                    <IoIosAdd style={{fontSize: "18px", marginRight: "6px"}}/>
                    Add picture
                </button>
            </div>


            <div className="page-title2">
                Album: {albumTitle}
            </div>

            <div className="header-buttons">
                <button className="view-button" onClick={goTo3DView}>
                    <FaRegEye style={{fontSize: "18px", marginRight: "6px"}}/>
                    3D View
                </button>

                <button className="menu-button">
                    <IoMenu style={{fontSize: "18px", paddingBottom: "0px"}}/>
                </button>
            </div>
        </div>
    );
};

export default HeaderAlbum;
