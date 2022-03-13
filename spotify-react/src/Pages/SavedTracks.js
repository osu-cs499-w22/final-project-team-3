import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomList from "../Components/CustomList";
import fetchLikedSongs from "../hooks/likedSongs";

const headers = [
    {
        text1: "Title",
        text2: "Artist",
        text3: "Album",
        text4: "Album Cover",
    },
];
let songs = [];
let loading = false;
function SavedTracks(props) {
    const token = props.token;
    const [offset, setOffset] = useState(0);
    const [listContent, setListContent] = useState([]);

    function useFetchLikedSongs(token, offset) {
        useEffect(() => {
            songs = fetchLikedSongs(token, offset);
        }, [token, offset]);
        return songs;
    }

    function handlePrev() {
        if (offset < 50) {
            console.log("cannot decrement further... At list beginning");
        } else {
            setOffset(offset - 50);
        }
    }
    function handleNext() {
        setOffset(offset + 50);
        console.log(songs);
    }
    songs = useFetchLikedSongs(token, offset);
    console.log("songs", songs);
    let temp = [];
    if (songs && songs.length > 0) {
        songs.map((song) => {
            temp.push({
                text1: song.track.name,
                text2: song.track.artists[0].name,
                text3: song.track.album.name,
                text4: song.track.album.images[2].url,
            });
        });
        console.log("temp", temp);
        setListContent(temp);
    }
    return (
        <div>
            <CustomList
                title={"Liked Songs"}
                listContent={listContent}
                headers={headers}
            />
            <button onClick={handlePrev}>prev</button>
            <button onClick={handleNext}>next</button>
        </div>
    );
}

export default SavedTracks;
