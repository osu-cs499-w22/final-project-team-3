import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ArtistDetails from "./Pages/ArtistDetails";
import FollowedArtists from "./Pages/FollowedArtists";
import Login from "./Pages/Login";
import Playlists from "./Pages/Playlists";
import SavedTracks from "./Pages/SavedTracks";
import TrackDetails from "./Pages/TrackDetails";

import Search from "./Pages/Search";
import "./App.css";

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/playlist" element={<Playlists />} />
            <Route path="/savedTracks" element={<SavedTracks />} />
            <Route path="/login" element={<Login />} />
            <Route path="/trackDetails" element={<TrackDetails />} />
            <Route path="/artistDetails" element={<ArtistDetails />} />
            <Route path="/followedArtists" element={<FollowedArtists />} />
        </Routes>
    );
}

export default App;
