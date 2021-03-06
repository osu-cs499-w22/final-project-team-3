import React, { useEffect, useState } from "react";
import { Box, IconButton, Typography, Avatar, Divider } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import numeral from "numeral";
import getArtistDetails from "../hooks/getArtistDetails";

function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

function ArtistDetails(props) {
    const params = useParams();
    console.log("params:", params)
    const token = props.token
    const [ artistContent, setArtistContent ] = useState({
        name: 'test',
        external_url: 'test.com',
        followers: '5',
        genres: ["test", "test2", "test3"],
        image: '1'
    })


    useEffect(() => {
        console.log("artistContent: ", artistContent)
        getArtistDetails(token, params.artist).then((details) => {
            setArtistContent({
                name: details.name,
                external_url: details.external_urls.spotify,
                followers: details.followers.total,
                genres: details.genres,
                image: details.images[0].url,
            })
        })
    }, [token])
    
    console.log("artistContent: ", artistContent)
    artistContent.genres.map((genre) => {
        console.log(genre)
    })

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
        <Box
          sx={{
            mt: "30px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "flex-end",
            width: "100%",
          }}
        >
          <Avatar
            sx={{ mr: "15px", height: "200px", width: "200px" }}
            src={artistContent.image}
            alt="pic"
          />
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              sx={{
                fontFamily: "Raleway",
                fontSize: "70px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              {artistContent.name}
            </Typography>
            <Typography
              sx={{
                fontFamily: "Raleway",
                fontSize: "20px",
                fontWeight: "normal",
                color: "white",
              }}
            >
              {" "}
              {numeral(artistContent.followers).format('0,0')} Followers
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            mt: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "40%",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Raleway",
              fontSize: "20px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Links:{" "}
          </Typography>
          <a style={{textDecorationColor: 'white'}} href={artistContent.external_url} target="_blank">
            {" "}
            <Typography
              sx={{
                fontFamily: "Raleway",
                fontSize: "16px",
                fontWeight: "normal",
                color: "white",
              }}
            >
              {artistContent.external_url}
            </Typography>
          </a>
        </Box>
        <Box
          sx={{
            mt: "20px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            width: "40%",
          }}
        >
          <Typography
            sx={{
              fontFamily: "Raleway",
              fontSize: "30px",
              fontWeight: "bold",
              color: "white",
            }}
          >
            Genres:
          </Typography>
          <Divider sx={{ width: "100%", color: "white" }} />
            {artistContent.genres.map(genre =>
                <Box>
                    <Typography
                        sx={{
                        fontFamily: "Raleway",
                        fontSize: "20px",
                        fontWeight: "bold",
                        color: "white",
                        }}
                    >
                        {titleCase(genre)}
                    </Typography>
                </Box>    
            )}
        </Box>
      </Box>
    );
}

export default ArtistDetails;
