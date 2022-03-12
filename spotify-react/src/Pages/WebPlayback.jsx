import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, IconButton } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayCircleRoundedIcon from '@mui/icons-material/PlayCircleRounded';
import PauseCircleFilledRoundedIcon from '@mui/icons-material/PauseCircleFilledRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';

const track = {
    name: "",
    album: {
        images: [
            { url: "" }
        ]
    },
    artists: [
        { name: "" }
    ]
}

function WebPlayback(props) {

    const [is_paused, setPaused] = useState(false);
    const [is_active, setActive] = useState(false);
    const [player, setPlayer] = useState(undefined);
    const [current_track, setTrack] = useState(track);

    const [favorite, setFavorite] = useState(false);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {

        const script = document.createElement("script");
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;

        document.body.appendChild(script);

        window.onSpotifyWebPlaybackSDKReady = () => {

            const player = new window.Spotify.Player({
                name: 'Web Playback SDK',
                getOAuthToken: cb => { cb(props.token); },
                volume: 0.5
            });

            setPlayer(player);

            player.addListener('ready', ({ device_id }) => {
                console.log('Ready with Device ID', device_id);
            });

            player.addListener('not_ready', ({ device_id }) => {
                console.log('Device ID has gone offline', device_id);
            });

            player.addListener('player_state_changed', ( state => {

                if (!state) {
                    return;
                }

                setTrack(state.track_window.current_track);
                setPaused(state.paused);

                player.getCurrentState().then( state => { 
                    (!state)? setActive(false) : setActive(true) 
                });

            }));

            player.connect();

        };
    }, [props.token]);

    if (!is_active) { 
        return (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              width: "100vw",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box sx={{ sisplay: "flex", flexDirection: "column" }}>
              <Typography sx={{ color: "white", fontSize: "30px", pr: "10px" }}>
                Instance not active. Transfer your playback within the Spotify
                App.
              </Typography>
              <Box sx={{ pl: "30px" }}>
                {" "}
                <Typography
                  sx={{ color: "white", fontSize: "20px", pt: "30px" }}
                >
                  -{">"} Connect to a device
                </Typography>
                <Typography
                  sx={{ color: "white", fontSize: "20px", pt: "30px" }}
                >
                  -{">"} Select: 'Web Playback SDK'
                </Typography>
              </Box>
            </Box>
          </Box>
        );
    } else {
        return (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                width: "100vw",
                height: "100%",
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
                  pb: "175px",
                }}
              >
                <Box sx={{ width: "500px", height: "550px" }}>
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
                    <Typography>Lyrics </Typography>
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
                  pb: "100px",
                }}
              >
                <Box sx={{ width: "400px", height: "400px" }}>
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
                      src={current_track.album.images[0].url}
                      alt=""
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
                  <Typography
                    sx={{ color: "white", fontSize: "30px", pr: "10px" }}
                  >
                    {current_track.name}
                  </Typography>
                  {favorite && (
                    <FavoriteIcon
                      sx={{ color: "white" }}
                      fontSize="large"
                      onClick={() => {
                        setFavorite(false);
                      }}
                    />
                  )}
                  {!favorite && (
                    <FavoriteBorderIcon
                      sx={{ color: "white" }}
                      fontSize="large"
                      onClick={() => {
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
                  <Typography
                    sx={{ color: "white", fontSize: "20px", pr: "10px" }}
                  >
                    {current_track.artists[0].name}
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
                    <SkipPreviousRoundedIcon
                    sx={{ color: "white", fontSize: 30 }}
                      onClick={() => {
                        player.previousTrack();
                        if(playing === false){
                            setPlaying(true)
                        }
                      }}
                    />
                  </IconButton>
                  <IconButton>
                    {playing && (
                      <PauseCircleFilledRoundedIcon
                        sx={{ color: "white", fontSize: 50 }}
                        onClick={() => {
                          setPlaying(false);
                          player.togglePlay();
                        }}
                      />
                    )}
                    {!playing && (
                      <PlayCircleRoundedIcon
                        sx={{ color: "white", fontSize: 50 }}
                        onClick={() => {
                          setPlaying(true);
                          player.togglePlay();
                        }}
                      />
                    )}
                  </IconButton>
                  <IconButton>
                    <SkipNextRoundedIcon
                    sx={{ color: "white", fontSize: 30 }}
                      onClick={() => {
                        player.nextTrack();
                        if(playing === false){
                            setPlaying(true)
                        }
                      }}
                    />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </>
        );
    }
}

export default WebPlayback
