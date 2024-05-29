import React, { useEffect, useState } from 'react';
import { accessToken, logout, getCurrentUserProfile, getTopArtists, getTopSongs } from './utils/Spotify';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, useSearchParams, useNavigate } from 'react-router-dom';
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
import 'bootstrap/dist/css/bootstrap.min.css';
import './styles/index.css';

const App = () => {
    const [userCode, setUserCode] = useState("");
    const [token, setToken] = useState(null);
    const [profile, setProfile] = useState(null);

    const [topArtistsShort, setTopArtistsShort] = useState([]);
    const [topArtistsMedium, setTopArtistsMedium] = useState([]);
    const [topArtistsLong, setTopArtistsLong] = useState([]);

    const [topSongsShort, setTopSongsShort] = useState([]);
    const [topSongsMedium, setTopSongsMedium] = useState([]);
    const [topSongsLong, setTopSongsLong] = useState([]);

    useEffect(() => {
        setToken(accessToken);

        const fetchData = async () => {
            try {
                const { data } = await getCurrentUserProfile();
                setProfile((prevProfile) => {
                    return data;
                });

                let userTopArtist = await getTopArtists();
                setTopArtistsShort(userTopArtist.data);

                userTopArtist = await getTopArtists("medium_term");
                setTopArtistsMedium(userTopArtist.data);

                userTopArtist = await getTopArtists("long_term");
                setTopArtistsLong(userTopArtist.data);


                let userTopSong = await getTopSongs();
                setTopSongsShort(userTopSong.data);

                userTopSong = await getTopSongs("medium_term");
                setTopSongsMedium(userTopSong.data);

                userTopSong = await getTopSongs("long_term");
                setTopSongsLong(userTopSong.data);

            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);


    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={profile ? <DiscoverPage /> : <Login />} />
                <Route path="/forums" element={<AllForums />} />
                <Route path="/forums/:id" element={<SingleForum />} />
                <Route path="/liked-songs" element={<LikedSongs />} />
                <Route path="/top-artists" element={<TopArtists topArtistsShort={topArtistsShort} topArtistsMedium={topArtistsMedium} topArtistsLong={topArtistsLong} />} />
                <Route path="/top-songs" element={<TopSongs topSongsShort={topSongsShort} topSongsMedium={topSongsMedium} topSongsLong={topSongsLong} />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/profile" element={<Profile profileInfo={profile} />} />
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
