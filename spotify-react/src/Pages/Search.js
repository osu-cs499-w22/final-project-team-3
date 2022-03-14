import React, { useEffect, forwardRef } from "react";
import { useState } from "react";
import styled from '@emotion/styled/macro';
import { Box, Typography, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore'
import CustomList from "../Components/CustomList";
import fetchSearchResults from "../hooks/useSearch"
import numeral from 'numeral';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const songHeaders = [
  {
    text1: "Song",
    text2: "Artist",
    text3: "",
    text4: "",
  }
]

const artistHeaders = [
  {
    text1: "Artist",
    text2: "Followers",
    text3: "Main Genre",
    text4: "",
  }
]

var listContent = []

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Input = styled.input`
  margin: 5px;
  border: none;
  border-radius: 100px;
  outline: none;
  height: 40px;
  margin-left: 50px;
  width: 400px;
  text-align: center;
  background-color: gainsboro;
  &:focus::placeholder {
    color: transparent;
  }
  font-size: 20px;
`;

function titleCase(str) {
  str = str.toLowerCase().split(' ');
  for (var i = 0; i < str.length; i++) {
    str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1); 
  }
  return str.join(' ');
}

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Search(props) {
    const token = props.token
    const [song, setSong] = useState('')
    const [paramSong, setParamSong] = useState('')
    const [type, setType] = useState('track')
    const [headers, setHeaders] = useState(songHeaders)
    const [offset, setOffset] = useState(0)
    const [listContent, setListContent] = useState([])
    const [songFilter, setSongFilter] = useState(true);
    const [albumFilter, setAlbumFilter] = useState(false);
    const [loading, setLoading] = useState(false);
    const [alertOpen, setAlertOpen] = useState(false);

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
      fetchSearchResults(token, paramSong, type, offset).then((results) => {
        console.log("token:", token)
        console.log("results:", results)
        let temp = [];
        // console.log("results: ", results);
        if(results && results.length > 0) {
          console.log("adding")
          if (type === 'track') {
            results.map((result) => {
              temp.push({
                id: result.id,
                type: 'trackDetails',
                text1: result.name,
                text2: result.artists[0].name,
                text3: result.popularity,
                text4: result.album.images[2].url
              })
            })
          } else {
            let i, j = 0
            console.log("adding artist")
            results.map((result) => {
              temp.push({
                id: result.id,
                type: 'artistDetails',
                text1: result.name,
                text2: numeral(result.followers.total).format('0,0'),
                text3: (result.genres.length > 0) ? titleCase(result.genres[0]) : '',
                text4: (result.images.length > 2) ? result.images[2].url : ''
              })
            })
          }
        }
        setListContent(temp);
      });
    }, [token, paramSong, type, offset]);

    function handlePrev() {
      if(offset < 50) {
        handleClick()
      } else {
        const list = document.getElementById("customList")
        list.scroll({ top: 0, behavior: "smooth" });
        setOffset(offset - 50)
      }
    }
    function handleNext() {
      const list = document.getElementById("customList")
      list.scroll({ top: 0, behavior: "smooth" });
      setOffset(offset + 50);
    }

    console.log("listContent: ", listContent)

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
            height: "auto",
            width: "90vw",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Box>
            <Box
              sx={{
                width: "100%",
                py: "5px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <Typography sx={{ pl: "10px", color: "white" }}>
                What do you want to listen to?
              </Typography>
            </Box>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                setListContent([]);
                setParamSong(song);
                setOffset(0);
                console.log("song searched");
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Input
                  value={song}
                  placeholder="Search..."
                  onChange={(e) => setSong(e.target.value)}
                />{" "}
                <IconButton type="submit">
                  <SearchIcon
                    fontSize="large"
                    sx={{ color: "white", "&:hover": { color: "green" } }}
                  />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", flexDirection: "row" }}>
                {!songFilter ? (
                  <IconButton
                    sx={{
                      backgroundColor: "white",
                      "&:hover": { backgroundColor: "#565656" },
                      borderRadius: "5px",
                      mt: "5px",
                    }}
                    onClick={(e) => {
                      setSongFilter(true);
                      setAlbumFilter(false);
                      console.log(songFilter);
                      e.preventDefault();
                      setType("track");
                      setHeaders(songHeaders);
                      setListContent([]);
                      setOffset(0);
                    }}
                  >
                    <AddIcon sx={{ color: "black" }} />
                    <Typography sx={{ color: "black", fontFamily: "Raleway" }}>
                      Songs
                    </Typography>
                  </IconButton>
                ) : (
                  <IconButton
                    sx={{
                      backgroundColor: "#565656",
                      "&:hover": { backgroundColor: "#565656", cursor: "auto" },
                      borderRadius: "5px",
                      mt: "5px",
                    }}
                  >
                    <AddIcon sx={{ color: "black" }} />
                    <Typography sx={{ color: "black", fontFamily: "Raleway" }}>
                      Songs
                    </Typography>
                  </IconButton>
                )}
                {!albumFilter ? (
                  <IconButton
                    sx={{
                      mx: "10px",
                      mt: "5px",
                      backgroundColor: "white",
                      "&:hover": { backgroundColor: "#565656" },
                      borderRadius: "5px",
                    }}
                    onClick={(e) => {
                      setAlbumFilter(true);
                      setSongFilter(false);
                      e.preventDefault();
                      setType("artist");
                      setHeaders(artistHeaders);
                      setListContent([]);
                      setOffset(0);
                    }}
                  >
                    <AddIcon sx={{ color: "black" }} />
                    <Typography sx={{ color: "black", fontFamily: "Raleway" }}>
                      Artists
                    </Typography>
                  </IconButton>
                ) : (
                  <IconButton
                    sx={{
                      mx: "10px",
                      mt: "5px",
                      backgroundColor: "#565656",
                      "&:hover": { backgroundColor: "#565656", cursor: "auto" },
                      borderRadius: "5px",
                    }}
                  >
                    <AddIcon sx={{ color: "black" }} />
                    <Typography sx={{ color: "black", fontFamily: "Raleway" }}>
                      Artists
                    </Typography>
                  </IconButton>
                )}

                <IconButton
                  sx={{
                    mt: "5px",
                    backgroundColor: "white",
                    "&:hover": { backgroundColor: "#565656" },
                    borderRadius: "5px",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    setSong("");
                    setParamSong("");
                    setListContent([]);
                    setOffset(0);
                  }}
                >
                  <Typography sx={{ color: "black", fontFamily: "Raleway" }}>
                    Clear
                  </Typography>
                </IconButton>
              </Box>
            </Form>
          </Box>
        </Box>
        <Box sx={{ height: "70%" }}>
          {listContent?.length > 0 && loading === false && (
            <>
              <CustomList
                // customIcon={type === 'track'}
                title={"Search Results"}
                listContent={listContent}
                headers={headers}
              />
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  mt: '10px'
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
          {listContent.length === 0 &&  (
            <Box sx={{mt: '50px'}}>
              <Typography
                sx={{
                  color: "white",
                  fontSize: "25px",
                  fontFamily: "Raleway",
                  fontWeight: "bold",
                }}
              >
                Search results will appear here!
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
    );
}

export default Search;
