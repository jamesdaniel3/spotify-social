import React from 'react'
import '../styles/navbar.css'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import {logout} from "../utils/Spotify.js";

const NavBar = () => {
  return (
    <>
        <Navbar className='navbar-dark' style={{padding:0}} expand={false} id='nav'>
          <Container style={{padding:0}}>
            <Navbar.Toggle className = 'toggle-btn' aria-controls={`offcanvasNavbar-expand-${false}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${false}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${false}`}
              placement="start"
              style={{backgroundColor: "#141414"}}
              backdrop={true}
            >
              <Offcanvas.Header closeButton className="custom-close-button"/>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                    <Nav.Link href="/" className={"nav-link"}>find users</Nav.Link>
                    <Nav.Link href="/profile" className={"nav-link"}>profile</Nav.Link>
                    <Nav.Link href="/messages" className={"nav-link"}>messages</Nav.Link>
                    <Nav.Link href="/forums" className={"nav-link"}>forums</Nav.Link>
                    <Nav.Link href="/liked-songs" className={"nav-link"}>liked songs</Nav.Link>
                    <Nav.Link href="/top-artists" className={"nav-link"}>top artists</Nav.Link>
                    <Nav.Link href="/top-songs" className={"nav-link"}>top songs</Nav.Link>
                    <Nav.Link onClick={logout} className={"nav-link"}>log out</Nav.Link>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
}

export default NavBar;