import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import axios from "axios";
import Header from "../components/Header.jsx";

import ArtistList from "../components/ArtistList.jsx";
import SongList from "../components/SongList.jsx";
import SettingsModal from "../components/SettingsModal.jsx";

export default function SearchedUser() {
    const {id} = useParams();
    const [firebaseInfo, setFirebaseInfo] = useState({});

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

    console.log(firebaseInfo)
    console.log(firebaseInfo.recent_top_artists)

    // put in an on click to navigate to spotify profile, requires adding field to cloudbase
    return(
        <>
            <>
                <Header title={firebaseInfo.display_name + "'s profile"} />
                <div className="profile-container">
                    <div className={"profile-header"}>
                        <img
                            src={firebaseInfo.profilePicture || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" }
                            alt={"profile picture"}
                            className="profile-pic"
                        />
                    </div>
                    <div className={"profile-info"}>
                        <h2 className={"username"} style={{ color: "white" }}>
                            {firebaseInfo.display_name}
                        </h2>
                        <p style={{ color: "white" }}>{firebaseInfo.followers} followers</p>
                    </div>

                    {firebaseInfo.display_info && (
                        <div className="profile-content">
                            <h2 style={{ justifyContent: "center" }}>Current Favorites</h2>
                            <div className="top-artists">
                                {firebaseInfo.recent_top_artists && <ArtistList data={firebaseInfo.recent_top_artists } />}
                            </div>
                            <div className="top-songs">
                                {firebaseInfo.recent_top_songs && <SongList data={firebaseInfo.recent_top_songs} />}
                            </div>
                        </div>
                    )}

                </div>
            </>
        </>
    )

};