import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header.jsx";
import ArtistList from "../components/ArtistList.jsx";
import SongList from "../components/SongList.jsx";

export default function SearchedUser({profileInfo}) {
    const { id } = useParams();
    const [firebaseInfo, setFirebaseInfo] = useState({});
    const [message, setMessage] = useState("");

    let current_user_id = "";
    if(profileInfo){
        current_user_id = profileInfo.id;
    }

    const fetchUserData = async () => {
        try {
            const result = await axios.get(`http://localhost:8888/user/${id}`);
            setFirebaseInfo(result.data);
        } catch (error) {
            console.error("Error checking for user:", error);
        }
    };

    useEffect(() => {
        if (id) {
            fetchUserData();
        }
    }, [id]);

    const handleSendMessage = () => {
        console.log("Message sent:", message);
        // Reset the message input
        setMessage("");
    };

    return (
        <>
            <Header title={firebaseInfo.display_name + "'s profile"} />
            <div className="profile-container">
                <div className="profile-header" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <img
                        src={firebaseInfo.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"}
                        alt={"profile picture"}
                        className="profile-pic"
                        style={{ marginRight: '20px' }}
                    />
                    {firebaseInfo.open_for_messages && (
                        <div className="message-input-container" style={{ display: 'flex', alignItems: 'center' }}>
                            <input
                                type="text"
                                placeholder="Send a message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                style={{ padding: '10px', borderRadius: '5px', marginRight: '10px' }}
                            />
                            <button
                                onClick={handleSendMessage}
                                style={{ padding: '10px 20px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}
                            >
                                Send
                            </button>
                        </div>
                    )}
                </div>
                <div className={"profile-info"}>
                    <h2 className={"username"} style={{ color: "white" }}>
                        {firebaseInfo.display_name}
                    </h2>
                    <p style={{ color: "white" }}>{firebaseInfo.followers} followers</p>
                </div>

                {firebaseInfo.display_info ? (
                    <div className="profile-content">
                        <h2 style={{ justifyContent: "center" }}>Current Favorites</h2>
                        <div className="top-artists">
                            {firebaseInfo.recent_top_artists && <ArtistList data={firebaseInfo.recent_top_artists} />}
                        </div>
                        <div className="top-songs">
                            {firebaseInfo.recent_top_songs && <SongList data={firebaseInfo.recent_top_songs} />}
                        </div>
                    </div>
                ) : (
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '60vh'
                    }}>
                        <h2>{firebaseInfo.display_name} is not displaying their current favorites</h2>
                    </div>
                )}
            </div>
        </>
    );
}
