import React from 'react';
import "../../styles/DropDownActionsRoom.css";
import { MdAddPhotoAlternate } from "react-icons/md";
import { TbReorder } from "react-icons/tb";
import { RiDeleteBin5Line } from "react-icons/ri";
import { RiShareBoxLine } from "react-icons/ri";

interface DropdownActionsProps {
    showDropdown: boolean;
    setShowDropdown: (showDropdown: boolean) => void;
    onSelect: (option: string) => void;
    isDrawerAddPaintOpen: boolean;
    setIsDrawerAddPaintOpen: (isDrawerAddPaintOpen: boolean) => void;
    removePaintingMode: boolean;
    setRemovePaintingMode: (removePaintingMode: boolean) => void;
}
const DropDownActionsRoom : React.FC<DropdownActionsProps> = ({showDropdown, setShowDropdown, onSelect, isDrawerAddPaintOpen, setIsDrawerAddPaintOpen,removePaintingMode,setRemovePaintingMode}) => {

    const handleClickAddPaint = () => {
        setIsDrawerAddPaintOpen(true);
        setShowDropdown(false);
    }

    const handleClickRemovePaint = () => {
        setRemovePaintingMode(true);
        setShowDropdown(false);
    }

    return (
        <div className="dropdown-menu2">
            <button>
                <div className="options-with-icon">
                    <MdAddPhotoAlternate style={{fontSize: "1.3rem", marginRight: "10px"}}/>
                    <div className="text-menu-element" onClick={handleClickAddPaint}>
                        Add Paintings
                    </div>
                </div>
            </button>
            <button style={{borderTop: "1px solid #c4c4c4"}}>
                <div className="options-with-icon">
                    <TbReorder style={{fontSize: "1.3rem", marginRight: "10px"}}/>
                    <div className="text-menu-element">
                        Reorder Paintings
                    </div>
                </div>
            </button>
            <button style={{borderTop: "1px solid #c4c4c4"}}>
                <div className="options-with-icon">
                    <RiDeleteBin5Line style={{fontSize: "1.3rem", marginRight: "10px"}}/>
                    <div className="text-menu-element" onClick={handleClickRemovePaint}>
                        Remove Paintings
                    </div>
                </div>
            </button>
            <button style={{borderTop: "1px solid #c4c4c4"}}>
                <div className="options-with-icon">
                    <RiShareBoxLine style={{fontSize: "1.3rem", marginRight: "10px"}}/>
                    <div className="text-menu-element">
                        Share Room
                    </div>
                </div>
            </button>

        </div>
    );
};

export default DropDownActionsRoom;