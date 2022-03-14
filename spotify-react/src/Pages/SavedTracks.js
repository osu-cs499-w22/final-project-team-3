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
function SavedTracks(props) {
    const token = props.token;
    const [offset, setOffset] = useState(0);
    const [listContent, setListContent] = useState([]);

    useEffect(() => {
        fetchLikedSongs(token, offset).then((songs) => {
            let temp = [];
            // console.log(songs);
            if (songs && songs.length > 0)
                // this can be done using properies of map return
                songs.map((song) => {
                    // console.log(song);
                    temp.push({
                        text1: song.track.name,
                        text2: song.track.artists[0].name,
                        text3: song.track.album.name,
                        text4: song.track.album.images[2].url,
                        text5: "test",
                    });
                });
            setListContent(temp);
        });
    }, [token, offset]);

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
    // songs = useFetchLikedSongs(token, offset);
    console.log("listContent", listContent);
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
