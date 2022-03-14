import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ArtistDetails from "./Pages/ArtistDetails";
import FollowedArtists from "./Pages/FollowedArtists";
import Login from "./Pages/Login";
import Playlists from "./Pages/Playlists";
import SavedTracks from "./Pages/SavedTracks";
import TrackDetails from "./Pages/TrackDetails";
import Search from "./Pages/Search";
import WebPlayback from "./Pages/WebPlayback";
import "./App.css";
import Wrapper from "./Components/Wrapper";
import PlaylistTracks from "./Pages/PlaylistTracks";
import CircularProgress from '@mui/material/CircularProgress';

function App() {
    const [token, setToken] = useState("");
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        async function getToken() {
          setLoading(true)
            const response = await fetch("/auth/token");
            const json = await response.json();
            console.log(json.access_token);
            setToken(json.access_token);
            setLoading(false)
        }

        getToken();
    }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={ loading ? (<Wrapper><CircularProgress /></Wrapper>) : ((token === '') ? <Wrapper><Login /></Wrapper> : <Wrapper><Search token={token}/></Wrapper>)} />
        <Route path="/playlists" element={<Wrapper><Playlists token={token}/></Wrapper>} />
        <Route path="/savedTracks" element={<Wrapper><SavedTracks token={token}/></Wrapper>} />
        <Route path="/login" element={<Wrapper><Login /></Wrapper>} />
        <Route path="/trackDetails" element={<Wrapper><TrackDetails token={token}/></Wrapper>} >
          <Route path=":track" element={<Wrapper><TrackDetails token={token}></TrackDetails></Wrapper>} />
        </Route>
        <Route path="/artistDetails" element={<Wrapper><ArtistDetails token={token}/></Wrapper>} >
          <Route path=":artist" element={<Wrapper><ArtistDetails token={token}></ArtistDetails></Wrapper>} />
        </Route>
        <Route path="/playlists" element={<Wrapper><PlaylistTracks token={token} /></Wrapper>} >
          <Route path=":playlist" element={<Wrapper><PlaylistTracks token={token} /></Wrapper>} />
        </Route>
        <Route path="/followedArtists" element={<Wrapper><FollowedArtists token={token}/></Wrapper>} />
        <Route path="/search" element={<Wrapper><Search token={token}/></Wrapper>} />
        <Route path="/playback" element={<Wrapper><WebPlayback token={token}/></Wrapper>} />
      </Routes>
    </>
  );
}

export default App;
