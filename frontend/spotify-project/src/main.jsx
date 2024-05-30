import React, {useEffect, useState} from 'react';
import grabSpotifyData from "./utils/GrabSpotifyData.js";
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import DiscoverPage from './routes/DiscoverPage.jsx';
import SingleForum from './routes/SingleForum.jsx';
import AllForums from './routes/AllForums.jsx';
import LikedSongs from './routes/LikedSongs.jsx';
import TopArtists from './routes/TopArtists.jsx';
import TopSongs from './routes/TopSongs.jsx';
import Profile from './routes/Profile.jsx';
import Messages from './routes/Messages.jsx';
import Login from './routes/Login.jsx';
import Chat from "./routes/Chat.jsx";
import SearchedUser from "./routes/SearchedUser"
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';
import axios from "axios";
import { truncateAndFilterTopArtists, truncateAndFilterTopSongs } from './utils/DataTruncation';

const App = () => {
    const {
        profile,
        topArtistsShort,
        topArtistsMedium,
        topArtistsLong,
        topSongsShort,
        topSongsMedium,
        topSongsLong,
        likedSongs,
    } = grabSpotifyData();


    useEffect(() => {
        const updateUserTopData = async () => {
            if (profile && topArtistsShort.items && topSongsShort.items) {
                const truncatedTopArtists = truncateAndFilterTopArtists(topArtistsShort.items);
                const truncatedTopSongs = truncateAndFilterTopSongs(topSongsShort.items);

                try {
                    await axios.post('http://localhost:8888/api/updateUserTopData', {
                        userId: profile.id,
                        topArtists: truncatedTopArtists,
                        topSongs: truncatedTopSongs
                    });
                    console.log('User top data updated successfully');
                } catch (error) {
                    console.error('Error updating user top data:', error);
                }
            }
        };

        updateUserTopData();
    }, [profile, topArtistsShort, topSongsShort]);


    return (
        <>
            <Routes>
                <Route path="/" element={profile ? <DiscoverPage profileInfo={profile} /> : <Login />} />
                <Route path="/forums" element={<AllForums />} />
                <Route path="/forums/:id" element={<SingleForum />} />
                <Route path="/liked-songs" element={<LikedSongs likedSongs={likedSongs} />} />
                <Route path="/top-artists" element={<TopArtists topArtistsShort={topArtistsShort} topArtistsMedium={topArtistsMedium} topArtistsLong={topArtistsLong} />} />
                <Route path="/top-songs" element={<TopSongs topSongsShort={topSongsShort} topSongsMedium={topSongsMedium} topSongsLong={topSongsLong} />} />
                <Route path="/messages" element={<Messages profileInfo={profile} />} />
                <Route path="/profile" element={<Profile profileInfo={profile} topArtistsShort={topArtistsShort} topSongsShort={topSongsShort}/>} />
                <Route path="/chats/:id" element={<Chat profileInfo={profile}/>} />
                <Route path="/profile/:id" element={<SearchedUser />} />
            </Routes>
        </>
    );
};

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);
