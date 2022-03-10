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
import Wrapper from "./Components/Wrapper";

function App() {
    return (
      <>
          <Routes>
            <Route path="/" element={<Wrapper><Home /></Wrapper>} />
            <Route path="/playlists" element={<Wrapper><Playlists /></Wrapper>} />
            <Route path="/savedTracks" element={<Wrapper><SavedTracks /></Wrapper>} />
            <Route path="/login" element={<Wrapper><Login /></Wrapper>} />
            <Route path="/trackDetails" element={<Wrapper><TrackDetails /></Wrapper>} />
            <Route path="/artistDetails" element={<Wrapper><ArtistDetails /></Wrapper>} />
            <Route path="/followedArtists" element={<Wrapper><FollowedArtists /></Wrapper>} />
            <Route path="/search" element={<Wrapper><Search /></Wrapper>} />
          </Routes>
      </>
    );
}

export default App;
