import React, { useEffect, useState } from "react";
import { Box, IconButton, Typography, Avatar, Divider } from "@mui/material";
import { Link } from "react-router-dom";
import getArtistDetails from "../hooks/getArtistDetails";
function ArtistDetails(props) {
    const token = props.token
    const [ artistContent, setArtistContent ] = useState({})

    useEffect(() => {
        getArtistDetails(token, "26VFTg2z8YR0cCuwLzESi2").then((details) => {
            setArtistContent({
                name: details.name,
                external_url: details.external_urls.spotify,
                followers: details.followers,
                genres: details.genres,
                image: details.images[0].url,
            })
        })
    }, [token])
    
    console.log("ArtistDetails: ", artistContent)
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
            src="https://thisis-images.scdn.co/37i9dQZF1DZ06evO3nMr04-large.jpg"
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
              Kanye West
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
              1,000,000 followers
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
          <a style={{textDecorationColor: 'white'}} href="https://shop.kanyewest.com/">
            {" "}
            <Typography
              sx={{
                fontFamily: "Raleway",
                fontSize: "16px",
                fontWeight: "normal",
                color: "white",
              }}
            >
              shop.kanyewest.com
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
          <Box>
            <Typography
              sx={{
                fontFamily: "Raleway",
                fontSize: "20px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Genre 1
            </Typography>
          </Box>
          <Box>
            <Typography
              sx={{
                fontFamily: "Raleway",
                fontSize: "20px",
                fontWeight: "bold",
                color: "white",
              }}
            >
              Genre 2
            </Typography>
          </Box>
        </Box>
      </Box>
    );
}

export default ArtistDetails;
