import React from "react";
import { useState } from "react";
import styled from '@emotion/styled/macro';
import { Box, Typography, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import CustomList from "../Components/CustomList";
import useSearch from "../hooks/useSearch"
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

function Search({ token }) {
    const [song, setSong] = useState('')
    const [paramSong, setParamSong] = useState('')
    const [type, setType] = useState('track')
    const [headers, setHeaders] = useState(songHeaders)

    const [results, loading] = useSearch(token, paramSong, type)

    if (results && results.length > 0 && (listContent.length == 0 || listContent[0].text1 !== results[0].name)) {
      if (type === 'track') {
        results.map(result =>
          listContent.push({
            text1: result.name,
            text2: result.artists[0].name,
            text3: "",
            text4: result.album.images[2].url
          },)
        )
      } else {
        results.map(result =>
          listContent.push({
            text1: result.name,
            text2: result.followers.total,
            text3: result.genres[0],
            text4: result.images[2].url
          },)  
        )
      }
      
    }

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
                }}>Songs</button>
              <button onClick={(e) => {
                e.preventDefault();
                setType('artist')
                setHeaders(artistHeaders)
                }}>Artists</button>
            </Form>
          </Box>
        </Box>
        <CustomList title={"Search Results"} listContent={listContent} headers={headers} />
      </Box>
      
    );
}

export default Search;
