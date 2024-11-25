import React, {useEffect, useState} from "react";
import "../../styles/AddPaint.css";
import {jwtDecode} from "jwt-decode";
import {useNavigate} from "react-router-dom";

interface UserToken {
    sub: string;
    iat: number;
    exp: number;
}

const AddPaint: React.FC<{ show: boolean; onClose: () => void }> = ({ show, onClose }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [author, setAuthor] = useState("");
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem("token");

        const updateLastNameFromToken = () => {
            if (token) {
                const decodedToken = jwtDecode(token) as UserToken;
                const email = decodedToken.sub;
                setEmail(email);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const token = localStorage.getItem("token");
        const imageBase64 = localStorage.getItem("restoredImage");

        if (!imageBase64 || !token) {
            setError("Image or token not found. Please try again.");
            return;
        }
        console.log(email);

        try {
            const formData = new FormData();
            const blob = await (await fetch(imageBase64)).blob();
            formData.append("image", blob, "restoredImage.png"); // Attach the image
            formData.append("email-user", email);
            formData.append("gallery-name", "None");
            formData.append("painting-name", name);
            formData.append("painting-description", description);
            formData.append("author", author);
            Array.from(formData.entries()).forEach(([key, value]) => {
                console.log(key, value);
            });

            const response = await fetch(
                `http://localhost:8080/api/v1/painting/add`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                    body: formData,
                }
            );

            if (!response.ok) {
                throw new Error("Failed to save the painting. Please try again.");
            }

            alert("Painting saved successfully!");
            onClose();
            navigate('/all-paintings');
        } catch (error) {
            setError((error as Error).message);
        }
    };

    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2>Enter Painting Details</h2>
                <form onSubmit={handleSubmit}>
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter name of the painting"
                            style={{width: "95%"}}
                            className={"input-add-paint"}
                            required
                        />
                    </label>
                    <label>
                        Description:
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Enter description"
                            style={{width: "95%"}}
                            className={"input-add-paint"}
                            required
                        />
                    </label>
                    <label>
                        Author:
                        <input
                            type="text"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            placeholder="Enter author name"
                            style={{width: "95%"}}
                            className={"input-add-paint"}
                            required
                        />
                    </label>
                    {error && <p className="error">{error}</p>}
                    <div className="modal-actions">
                        <button type="submit">Save</button>
                        <button type="button" onClick={onClose}>Cancel</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddPaint;
