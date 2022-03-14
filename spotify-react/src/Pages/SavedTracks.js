import { Box, IconButton } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
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
            console.log(songs);
            if (songs && songs.length > 0)
                // this can be done using properies of map return
                songs.map((song) => {
                    console.log(song);
                    temp.push({
                        id: song.track.id,
                        type: 'trackDetails',
                        text1: song.track.name,
                        text2: song.track.artists[0].name,
                        text3: song.track.album.name,
                        text4: song.track.album.images[2].url,
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
      <Box
        sx={{
          height: "92vh",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
        }}
      >
        <Box sx={{ height: "90%" }}>
          <CustomList
            title={"Liked Songs"}
            listContent={listContent}
            headers={headers}
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              mt: "10px",
            }}
          >
            <IconButton
              onClick={handlePrev}
              sx={{
                backgroundColor: "white",
                "&:hover": { backgroundColor: "#565656" },
                borderRadius: "5px",
              }}
            >
              {" "}
              <NavigateBeforeIcon sx={{ color: "black" }} />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                backgroundColor: "white",
                "&:hover": { backgroundColor: "#565656" },
                borderRadius: "5px",
              }}
            >
              <NavigateNextIcon sx={{ color: "black" }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    );
}

export default SavedTracks;
