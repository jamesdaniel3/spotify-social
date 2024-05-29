import React from "react";
import {Container} from "react-bootstrap"

const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=11e1a72b45c34d1a97029a9de998f1fa&response_type=code&redirect_uri=http://localhost:8888/callback&scope=streaming%20user-read-email%20user-read-private%20user-top-read%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"


export default function Login() {

    return (
        <>
            <Container
                className={"d-flex justify-content-center"}
                style={{}}
            >
                <a className={"btn btn-success btn-lg" } href={AUTH_URL}>Login With Spotify</a>
            </Container>
        </>
    )
}
