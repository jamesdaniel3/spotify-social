export const truncateAndFilterTopArtists = (artists) => {
    return artists.slice(0, 5).map(artist => ({
        external_urls: artist.external_urls,
        images: artist.images,
        name: artist.name
    }));
};

export const truncateAndFilterTopSongs = (songs) => {
    return songs.slice(0, 5).map(song => ({
        album: song.album,
        artists: song.artists,
        name: song.name
    }));
};