import { useEffect, useState } from 'react';
import {getCurrentUserProfile, getTopArtists, getTopSongs} from "./Spotify.js";

const grabSpotifyData = () => {
    const [profile, setProfile] = useState(null);
    const [topArtistsShort, setTopArtistsShort] = useState([]);
    const [topArtistsMedium, setTopArtistsMedium] = useState([]);
    const [topArtistsLong, setTopArtistsLong] = useState([]);
    const [topSongsShort, setTopSongsShort] = useState([]);
    const [topSongsMedium, setTopSongsMedium] = useState([]);
    const [topSongsLong, setTopSongsLong] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await getCurrentUserProfile();
                setProfile(data);

                const [userTopArtistShort, userTopArtistMedium, userTopArtistLong] = await Promise.all([
                    getTopArtists(),
                    getTopArtists("medium_term"),
                    getTopArtists("long_term")
                ]);

                setTopArtistsShort(userTopArtistShort.data);
                setTopArtistsMedium(userTopArtistMedium.data);
                setTopArtistsLong(userTopArtistLong.data);

                const [userTopSongShort, userTopSongMedium, userTopSongLong] = await Promise.all([
                    getTopSongs(),
                    getTopSongs("medium_term"),
                    getTopSongs("long_term")
                ]);

                setTopSongsShort(userTopSongShort.data);
                setTopSongsMedium(userTopSongMedium.data);
                setTopSongsLong(userTopSongLong.data);
            } catch (e) {
                console.error(e);
            }
        };

        fetchData();
    }, []);

    return {
        profile,
        topArtistsShort,
        topArtistsMedium,
        topArtistsLong,
        topSongsShort,
        topSongsMedium,
        topSongsLong,
    };
};

export default grabSpotifyData;