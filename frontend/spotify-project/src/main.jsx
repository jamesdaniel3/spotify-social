import React, {useEffect, useState} from 'react';
import { accessToken, logout, getCurrentUserProfile } from './utils/Spotify';
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

    useEffect(() => {
        setToken(accessToken);

        const fetchData = async () => {
            try {
                const { data } = await getCurrentUserProfile();
                setProfile((prevProfile) => {
                    return data;
                });
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    console.log(profile)

    return (
        <>
            <NavBar />
            <Routes>
                <Route path="/" element={profile ? <DiscoverPage /> : <Login />} />
                <Route path="/forums" element={<AllForums />} />
                <Route path="/forums/:id" element={<SingleForum />} />
                <Route path="/liked-songs" element={<LikedSongs />} />
                <Route path="/top-artists" element={<TopArtists />} />
                <Route path="/top-songs" element={<TopSongs />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/profile" element={<Profile />} />
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