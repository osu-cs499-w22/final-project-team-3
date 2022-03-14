import { Box, IconButton } from "@mui/material";
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import React, { useState, useEffect, forwardRef } from "react";
import CustomList from "../Components/CustomList";
import fetchPlayists from "../hooks/userPlaylists";
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const headers = [
    {
        text1: "Title",
        text2: "Song Count",
        text3: "Creator",
        text4: "Playlist Cover",
    },
];

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Playlists(props) {
    let token = props.token;
    const [offset, setOffset] = useState(0);
    const [listContent, setListContent] = useState([]);
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
        fetchPlayists(token, offset).then((playlists) => {
            let temp = [];
            if (playlists && playlists.length > 0)
                // this can be done using properies of map return
                playlists.map((playlist) => {
                    temp.push({
                        text1: playlist.name,
                        text2: playlist.tracks.total,
                        text3: playlist.owner.display_name,
                        text4: (playlist.images.length > 0) ? playlist.images[0].url : '',
                    });
                });
            setListContent(temp);
        });
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
                title={"Playlists"}
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
                      "&:hover": { backgroundColor: "#565656", cursor: "auto" },
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

export default Playlists;
