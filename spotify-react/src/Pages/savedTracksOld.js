import { Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import CustomList from "../Components/CustomList";
import useLikedSongs from "../hooks/likedSongs";

const headers = [
    {
        text1: "Title",
        text2: "Artist",
        text3: "Album",
        text4: "Album Cover",
    },
];

var listContent = [];
function SavedTracks(props) {
    const token = props.token;
    const [offset, setOffset] = useState(0);
    const [songs, loading] = useLikedSongs(token, offset);
    function handlePrev() {
        if (offset < 50) {
            console.log("cannot decrement further... At list beginning");
        } else {
            setOffset(offset - 50);
        }
    }
    function handleNext() {
        setOffset(offset + 50);
    }

    console.log("songs", songs);
    if (songs && songs.length > 0 && listContent.length < 1) {
        songs.map((song) => {
            listContent.push({
                text1: song.track.name,
                text2: song.track.artists[0].name,
                text3: song.track.album.name,
                text4: song.track.album.images[2].url,
            });
        });
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
