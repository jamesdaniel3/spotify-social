import React from "react";
import { Container } from "react-bootstrap";
import "../styles/login.css";

const AUTH_URL = "http://localhost:8888/login";

export default function Login() {
    return (
        <Container
            className="d-flex flex-column align-items-center justify-content-center min-vh-100"
            style={{ position: 'relative', top: '-60px' }} // Adjust the top value as needed
        >
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
        </Container>
    );
}
