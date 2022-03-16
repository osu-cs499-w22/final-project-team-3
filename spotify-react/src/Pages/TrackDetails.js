import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Box, Typography, Card, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import addRemoveSong from "../hooks/addRemoveSong";
import checkSavedTracks from "../hooks/checkSavedTracks";
import getTrackDetails from "../hooks/getTrackDetails";
import { Link, useParams } from "react-router-dom";

function TrackDetails(props) {
  const params = useParams();
  const token = props.token;
  const [favorite, setFavorite] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [saved, setSaved] = useState(false);
  const [trackContent, setTrackContent] = useState({
    name: "Track1",
    artistName: "Test",
    artistId: "aispodgjasd",
    image: "1",
    lyrics: "",
  });

  function getLyrics(title, artist) {
    axios
      .get("http://localhost:5000/lyrics", {
        params: {
          q: title,
          a: artist,
        },
      })
      .then((resp) => {
        console.log(resp.data);
        setTrackContent((pContent) => ({
          ...pContent,
          lyrics: resp.data,
        }));
      });
  }

  useEffect(() => {
    checkSavedTracks(token, params.track).then((saved) => {
      setFavorite(saved);
    });
    getTrackDetails(token, params.track).then((details) => {
      setTrackContent({
        name: details.name,
        artistName: details.artists[0].name,
        artistId: details.artists[0].id,
        image: details.album.images[0].url,
      });

      getLyrics(details.name, details.artists[0].name);
    });
  }, [token]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100%",
        height: "92vh",
      }}
    >
      <Box
        sx={{
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "60%", height: "80%" }}>
          <Card
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "center",
              overflowY: "auto",
              flexDirection: "column",
            }}
          >
            {trackContent.lyrics ? (
              <Box sx={{ overflowY: "auto", height: "auto" }}>
                {trackContent.lyrics.split("\n").map((line, i) => {
                  return (
                    <Typography
                      key={i}
                      variant="body1"
                      sx={{ fontSize: "1.5rem" }}
                    >
                      {line}
                    </Typography>
                  );
                })}
              </Box>
            ) : (
              <Box
                sx={{
                  width: "100%",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <Typography>No lyrics found</Typography>
              </Box>
            )}
          </Card>
        </Box>
      </Box>
      <Box
        sx={{
          width: "50%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Box sx={{ width: "50%", height: "55%" }}>
          <Card
            sx={{
              width: "100%",
              height: "100%",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              height="100%"
              width="100%"
              src={trackContent.image}
              alt="Album Art"
            />
          </Card>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            pt: "50px",
          }}
        >
          <Box />
          <Typography sx={{ color: "white", fontSize: "30px", pr: "10px" }}>
            {trackContent.name}
          </Typography>
          {favorite && (
            <FavoriteIcon
              sx={{ color: "white" }}
              fontSize="large"
              onClick={() => {
                addRemoveSong(token, params.track, "DELETE");
                setFavorite(false);
              }}
            />
          )}
          {!favorite && (
            <FavoriteBorderIcon
              sx={{ color: "white" }}
              fontSize="large"
              onClick={() => {
                addRemoveSong(token, params.track, "PUT");
                setFavorite(true);
              }}
            />
          )}
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            pt: "15px",
          }}
        >
          <Typography sx={{ color: "white", fontSize: "20px", pr: "10px" }}>
            <Link
              to={`/artistDetails/${trackContent.artistId}`}
              style={{
                textDecorationColor: "white",
                fontFamily: "Raleway",
                color: "white",
              }}
            >
              {trackContent.artistName}
            </Link>
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            pt: "15px",
          }}
        >
          <IconButton>
            {playing && (
              <PauseCircleFilledRoundedIcon
                sx={{ color: "white", fontSize: 50 }}
                onClick={() => setPlaying(false)}
              />
            )}
            {!playing && (
              <PlayCircleRoundedIcon
                sx={{ color: "white", fontSize: 50 }}
                onClick={() => setPlaying(true)}
              />
            )}
          </IconButton>
        </Box>

        {/* <button onClick={() => {
            addRemoveSong(token, '1DMEzmAoQIikcL52psptQL', 'PUT')
            setSaved(true)
            }}>Add</button>
          <button onClick={() => {
            addRemoveSong(token, '1DMEzmAoQIikcL52psptQL', 'DELETE')
            setSaved(false)
            }}>Remove</button>
          <button>{saved ? "Saved" : "Not Saved"}</button> */}
      </Box>
    </Box>
  );
}

export default TrackDetails;
