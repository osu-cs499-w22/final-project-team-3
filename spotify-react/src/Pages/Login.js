import React, { useState } from "react";
import styled from '@emotion/styled/macro';
import { Box, Typography, Card } from '@mui/material'
import { Link } from "react-router-dom";

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
  width: 340px;
  text-align: center;
  background-color: gainsboro;
  &:focus::placeholder {
    color: transparent;
  }
  font-size: 20px;
  font-family: 'Raleway';
`;

const Submit = styled.button`
  height: 40px;
  width: 75px;
  outline: none;
  border: none;
  cursor: pointer;
  border-radius:5px;
  margin-top: 15px;
  background-color: gainsboro;
  &:hover {
    background-color: green;
  }
  font-family: 'Raleway';
`;

const SubmitDisabled = styled.button`
  height: 40px;
  margin-top: 15px;
  width: 75px;
  outline: none;
  border: none;
  border-radius:5px;
  font-family: 'Raleway';
`;

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('')
  return (
    <Card>
      <Box
        sx={{
          height: "300px",
          width: "500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Box sx={{ width: "100%", pb: "25px" }}>
            <Typography
              sx={{
                pl: "10px",
                fontFamily: "Raleway",
                fontSize: "24px",
                fontWeight: "bold",
              }}
            >
              Log in with your Spotify credentials:
            </Typography>
          </Box>
          <Form
            onSubmit={(e) => {
              e.preventDefault();
              console.log("logged in");
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography sx={{ pl: "10px", fontFamily: "Raleway" }}>
                Username:
              </Typography>
            </Box>

            <Input
              value={username}
              placeholder="Enter your Spotify Username..."
              onChange={(e) => setUsername(e.target.value)}
            />
            <Box sx={{ width: "100%" }}>
              <Typography sx={{ pl: "10px" }}>Password:</Typography>
            </Box>
            <Input
              value={password}
              placeholder="Enter your Spotify Password..."
              onChange={(e) => setPassword(e.target.value)}
            />
            {username && password && (
              <Link
                to="/search"
                style={{
                  textDecoration: "none",
                  fontFamily: "Raleway",
                  color: "black",
                }}
              >
                <Submit type="submit">Login</Submit>
              </Link>
            )}
            {(!username || !password) && (
              <SubmitDisabled type="submit" disabled={!username || !password}>
                Login
              </SubmitDisabled>
            )}
          </Form>
        </Box>
      </Box>
    </Card>
  );
}

export default Login;
