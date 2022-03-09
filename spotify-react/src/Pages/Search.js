import React from "react";
import { useState } from "react";
import styled from '@emotion/styled/macro';
import { Box, Typography, IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';

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

function Search(test) {
    const [song, setSong] = useState('')
    return (
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
          </Form>
        </Box>
      </Box>
    );
}

export default Search;
