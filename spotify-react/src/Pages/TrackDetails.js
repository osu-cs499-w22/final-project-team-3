import React from "react";
import { useState } from "react";
import { Box, Typography, Card, IconButton } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import getSongDetail from "../hooks/getSongDetail";

function TrackDetails(props) {
    const [favorite, setFavorite] = useState(false);
    const [playing, setPlaying] = useState(false);
    const [song, setSong] = useState({});
    let token = props.token;
    let id = "11dFghVXANMlKmJXsNCbNl";
    getSongDetail(token, id).then((song) => {
        console.log(song);
        let newSong = {
            title: song.name,
            arist: song.artists[0].name,
            art: song.album.images[0],
        };
        setSong(newSong);
    });
    return (
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
                        <Typography>Album Art </Typography>
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
                        {song.title}
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
                        Artists name
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
            </Box>
        </Box>
    );
}

export default TrackDetails;
