import { Box, IconButton } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import React, { useState, useEffect, forwardRef } from "react";
import CustomList from "../Components/CustomList";
import fetchFollowedArtists from "../hooks/followedArtists"
import numeral from 'numeral';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function FollowedArtists(props) {

    const token = props.token
    const [ offset, setOffset ] = useState(0);
    const [ listContent, setListContent ] = useState([])
    const [alertOpen, setAlertOpen] = useState(false)

    const handleClick = () => {
      setAlertOpen(true);
    };
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setAlertOpen(false);
    }

    useEffect(() => {
        fetchFollowedArtists(token, offset).then((artists) => {
            let temp = [];
            if(artists && artists.length > 0)
                artists.map((artist) => {
                    temp.push({
                        id: artist.id,
                        type: 'artistDetails',
                        text1: artist.name,
                        text2: numeral(artist.followers.total).format('0,0'),
                        text3: (artist.genres.length > 0) ? titleCase(artist.genres[0]) : '',
                        text4: artist.images[2].url
                    });
                });
            setListContent(temp);
        })
    }, [token, offset]);

    function handlePrev() {
        if (offset < 50) {
          handleClick()
        } else {
          const list = document.getElementById("customList")
          list.scroll({ top: 0, behavior: "smooth" });
          setOffset(offset - 50);
        }
    }

    function handleNext() {
      const list = document.getElementById("customList")
      list.scroll({ top: 0, behavior: "smooth" });
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
                      "&:hover": { backgroundColor: "#565656", cursor: 'auto' },
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
                      "&:hover": { backgroundColor: "#565656" },
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
