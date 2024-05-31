import React from "react";
import { Container } from "react-bootstrap";
import "../styles/login.css";

const AUTH_URL = "http://localhost:8888/login";
const albums = [
    "https://i.scdn.co/image/ab67616d0000b273fb1cb900d28642e668d77b12",
    "https://i.scdn.co/image/ab67616d0000b2738c1fadcc997a65384f34d694",
    "https://i.scdn.co/image/ab67616d0000b273cc68329bfbf34037df965dc1",
    "https://i.scdn.co/image/ab67616d0000b2731c3e0a58f3ee28af2922e351",
    "https://i.scdn.co/image/ab67616d0000b273b2b6670e3aca9bcd55fbabbb",
    "https://i.scdn.co/image/ab67616d0000b27348f2487a18a735f457404eb9",
    "https://i.scdn.co/image/ab67616d0000b27377c339de2168c8b893a64407",
    "https://i.scdn.co/image/ab67616d0000b273e08b1250db5f75643f1508c9",
    "https://i.scdn.co/image/ab67616d0000b273eb86b9f20d2dc7ca6e89cbe0",
    "https://i.scdn.co/image/ab67616d0000b273b2b6670e3aca9bcd55fbabbb"
];

export default function Login() {
    return (
        <Container
            className="d-flex flex-column align-items-center justify-content-center min-vh-100"
            style={{ position: 'relative', top: '0px' }} // Adjust the top value as needed
        >
            <div className="split left">
                <div className="welcome text-center">
                    <h1>
                        Welcome to Spotify <span className="animated-text">Social</span>
                    </h1>
                    <a className="btn custom-btn btn-lg mt-3" href={AUTH_URL}>
                        Login With Spotify
                    </a>
                </div>

                <div className="no-account text-center mt-4">
                    <h5>
                        Don't have a Spotify account? Sign up{" "}
                        <a
                            href={"https://www.spotify.com/us/signup"}
                            target={"_blank"}
                            style={{ color: "#1DB954" }}
                        >
                            Here
                        </a>
                    </h5>
                </div>
            </div>

            <div className="split right">
                <div className="album-conveyor">
                    {albums.map((album, index) => (
                        <img key={index} src={album} alt={`Album cover ${index + 1}`} className="album-cover" />
                    ))}
                </div>
            </div>
        </Container>
    );
}