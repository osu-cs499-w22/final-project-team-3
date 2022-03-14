import { Box, IconButton } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import React, { useState, useEffect } from "react";
import CustomList from "../Components/CustomList";
import fetchFollowedArtists from "../hooks/followedArtists"
import numeral from 'numeral';

const headers = [
  {
    text1: "Artist",
    text2: "Followers",
    text3: "Main Genre",
    text4: "Photo",
  },
];

function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

let artists = []
function FollowedArtists(props) {

    const token = props.token
    const [ offset, setOffset ] = useState(0);
    const [ listContent, setListContent ] = useState([])

    useEffect(() => {
        fetchFollowedArtists(token, offset).then((artists) => {
            let temp = [];
            console.log(artists);
            if(artists && artists.length > 0)
                artists.map((artist) => {
                    console.log(artist);
                    temp.push({
                        text1: artist.name,
                        // text2: numeral(artist.followers.total).format('0,0'),
                        // text3: titleCase(artist.genres[0]),
                        text2: artist.followers.total,
                        text3: artist.genres[0],
                        text4: artist.images[2].url
                    });
                });
            setListContent(temp);
            console.log(listContent)
        })
    }, [token, offset, listContent]);

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

export default FollowedArtists;
