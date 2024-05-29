import React from "react";
import {Container} from "react-bootstrap"

const AUTH_URL = "http://localhost:8888/login"

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
