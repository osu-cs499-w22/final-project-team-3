import React, { useEffect } from "react";
import { useState } from "react";
import styled from '@emotion/styled/macro';
import { Box, Typography, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import CustomList from "../Components/CustomList";
import fetchSearchResults from "../hooks/useSearch"
import { Button } from "bootstrap";

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

function Search(props) {
    const token = props.token
    const [song, setSong] = useState('')
    const [paramSong, setParamSong] = useState('')
    const [type, setType] = useState('track')
    const [headers, setHeaders] = useState(songHeaders)
    const [offset, setOffset] = useState(0)
    const [listContent, setListContent] = useState([])

    useEffect(() => {
      fetchSearchResults(token, paramSong, type, offset).then((results) => {
        console.log("token:", token)
        console.log("results:", results)
        let temp = [];
        // console.log("results: ", results);
        if(results && results.length > 0) {
          console.log("adding")
          if (type == 'track') {
            results.map((result) => {
              temp.push({
                text1: result.name,
                text2: result.artists[0].name,
                text3: "Save Song",
                text4: result.album.images[2].url
              })
            })
          } else {
            let i, j = 0
            console.log("adding artist")
            results.map((result) => {
              temp.push({
                text1: result.name,
                text2: result.followers.total,
                text3: result.genres[0],
                text4: (result.images.length > 0) ? result.images[2].url : ''
              })
            })
          }
        }
        setListContent(temp);
      });
    }, [token, paramSong, type, offset]);

    function handlePrev() {
      if(offset < 50) {
        console.log("cannot decrememnt further... At list beginning");
      } else {
        setOffset(offset - 50)
      }
    }
    function handleNext() {
      setOffset(offset + 50);
    }

    console.log("listContent: ", listContent)

    return (
      <Box sx={{
        height: "500px",
        width: "700px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"
      }} >
        <Box
          sx={{
            height: "300px",
            width: "500px",
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Box>
            <Box sx={{ width: "100%", pb: '30px', display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
              <Typography sx={{ pl: "10px", color: "white" }}>
                What do you want to listen to?
              </Typography>
            </Box>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                setParamSong(song)
                setListContent([])
                setOffset(0)
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
                  placeholder="Search for a song..."
                  onChange={(e) => setSong(e.target.value)}
                />{" "}
                <IconButton type="submit">
                  <SearchIcon fontSize="large" sx={{ color: "white", "&:hover": {color: 'green'} }} />
                </IconButton>
              </Box>
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  setType('track')
                  setHeaders(songHeaders)
                  setListContent([])
                  setOffset(0)
                }}>Songs</button>
              <button onClick={(e) => {
                e.preventDefault();
                setType('artist')
                setHeaders(artistHeaders)
                setListContent([])
                setOffset(0)
                }}>Artists</button>
              <button onClick={(e) => {
                e.preventDefault();
                setSong('');
                setParamSong('');
                setListContent([])
                setOffset(0)
              }}>Clear</button>
            </Form>
          </Box>
        </Box>
        <CustomList title={"Search Results"} listContent={listContent} headers={headers} />
        <button onClick={handlePrev}>prev</button>
        <button onClick={handleNext}>next</button>
      </Box>
      
    );
}

export default Search;
