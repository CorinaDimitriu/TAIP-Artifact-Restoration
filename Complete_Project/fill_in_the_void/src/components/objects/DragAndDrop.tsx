import React, { useCallback, useState, useImperativeHandle, forwardRef } from 'react';
import '../../styles/DragAndDrop.css';

interface DragAndDropProps {
    onFileUpload: (file: File | null) => void;
}

const DragAndDrop = forwardRef<unknown, DragAndDropProps>(({ onFileUpload }, ref) => {
    const [fileName, setFileName] = useState<string | null>(null);
    const fileInputRef = React.createRef<HTMLInputElement>();

    const handleDrop = useCallback((event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const files = event.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    }, []);

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    const handleClick = () => {
        fileInputRef.current?.click(); // Trigger file input click
    };

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            handleFile(files[0]);
        }
    };

    const handleFile = (file: File) => {
        if (file.type === 'image/jpeg' || file.type === 'image/png') {
            setFileName(file.name);
            onFileUpload(file);
        } else {
            alert('Please upload a valid image file (PNG or JPG).');
            onFileUpload(null);
        }
    };

    useImperativeHandle(ref, () => ({
        getFileName: () => fileName,
    }));

    return (
        <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            className="drag-and-drop"
            onClick={handleClick}
            style={{ cursor: 'pointer' }}
        >
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                onChange={handleChange}
            />
            <p>Drag and drop your image here, or click to upload.</p>
            {fileName && <p style={{color:"green", fontWeight:"bold"}}>Uploaded File: {fileName}</p>}
        </div>
    );
});

export default DragAndDrop;
