/** @jsxImportSource @emotion/react */
import { Nav, Container, Navbar } from "react-bootstrap";
import { css } from "@emotion/react";

function NavigationBar() {
    return (
        <Navbar bg="dark" variant="dark">
            <Container className="container">
                <Navbar.Brand href="/">Spotify React</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link href="/playlist">Playlists</Nav.Link>
                    <Nav.Link href="/artistDetails">ArtistDetails</Nav.Link>
                    <Nav.Link href="/followedArtists">followedArtists</Nav.Link>
                    <Nav.Link href="/login">Login</Nav.Link>
                    <Nav.Link href="/savedTracks">SavedTracks</Nav.Link>
                    <Nav.Link href="/trackDetails">trackDetails</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
}
export default NavigationBar;
