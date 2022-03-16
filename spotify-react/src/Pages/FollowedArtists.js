import { Box, IconButton } from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import React, { useState, useEffect, forwardRef } from "react";
import CustomList from "../Components/CustomList";
import fetchFollowedArtists from "../hooks/followedArtists";
import numeral from "numeral";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const headers = [
    {
        text1: "Artist",
        text2: "Followers",
        text3: "Main Genre",
        text4: "Photo",
    },
];

let apiList = [];
apiList.push("https://api.spotify.com/v1/me/following?type=artist");
function titleCase(str) {
    str = str.toLowerCase().split(" ");
    for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
    }
    return str.join(" ");
}

let artists = [];

const Alert = forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function FollowedArtists(props) {
    const token = props.token;
    const [offset, setOffset] = useState(0);
    const [listContent, setListContent] = useState([]);
    const [alertOpen, setAlertOpen] = useState(false);
    const [apiUrl, setApiUrl] = useState(
        "https://api.spotify.com/v1/me/following?type=artist"
    );
    const [apiNext, setApiNext] = useState("");
    const [apiPrev, setApiPrev] = useState("");

    const handleClick = () => {
        setAlertOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setAlertOpen(false);
    };

    useEffect(() => {
        fetchFollowedArtists(token, apiUrl).then((artists) => {
            let temp = [];
            console.log(artists);
            if (artists.items && artists.items.length > 0) {
                apiList.push(artists.next);

                artists.items.map((artist) => {
                    temp.push({
                        id: artist.id,
                        type: "artistDetails",
                        text1: artist.name,
                        text2: numeral(artist.followers.total).format("0,0"),
                        text3:
                            artist.genres.length > 0
                                ? titleCase(artist.genres[0])
                                : "",
                        text4: artist.images[2].url,
                    });
                });
            }
            setListContent(temp);
        });
    }, [token, apiUrl]);

    function handlePrev() {
        const list = document.getElementById("customList");
        list.scroll({ top: 0, behavior: "smooth" });
        console.log(apiList);
        // apiList.pop();
        console.log(apiList);
        console.log(apiList[apiList.length - 1]);
        // setApiUrl(apiList[apiList.length - 1]);
        setApiUrl(apiList[apiList.length - 1]);
    }

    function handleNext() {
        const list = document.getElementById("customList");
        list.scroll({ top: 0, behavior: "smooth" });
        setApiUrl(apiList[apiList.length - 1]);
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
                {listContent?.length === 0 ? (
                    <Box
                        sx={{
                            display: "flex",
                            flexdirection: "row",
                            alignItems: "center",
                            height: "100%",
                        }}
                    >
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <CustomList
                            title={"Followed Artists"}
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
                            <Snackbar
                                open={alertOpen}
                                autoHideDuration={6000}
                                onClose={handleClose}
                            >
                                <Alert
                                    onClose={handleClose}
                                    severity="error"
                                    sx={{ width: "100%" }}
                                >
                                    At beginning of list!
                                </Alert>
                            </Snackbar>
                            {listContent?.length < 50 ? (
                                <IconButton
                                    sx={{
                                        backgroundColor: "#565656",
                                        "&:hover": {
                                            backgroundColor: "#565656",
                                            cursor: "auto",
                                        },
                                        borderRadius: "5px",
                                    }}
                                >
                                    <NavigateNextIcon sx={{ color: "black" }} />
                                </IconButton>
                            ) : (
                                <IconButton
                                    onClick={handleNext}
                                    sx={{
                                        backgroundColor: "white",
                                        "&:hover": {
                                            backgroundColor: "#565656",
                                        },
                                        borderRadius: "5px",
                                    }}
                                >
                                    <NavigateNextIcon sx={{ color: "black" }} />
                                </IconButton>
                            )}
                        </Box>
                    </>
                )}
            </Box>
        </Box>
    );
}

export default FollowedArtists;
