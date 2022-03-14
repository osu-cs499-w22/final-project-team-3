/** @jsxImportSource @emotion/react */
import React from "react";
import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
} from "@mui/material";
import LibraryMusicIcon from "@mui/icons-material/LibraryMusic";
import PersonIcon from "@mui/icons-material/Person";
import SearchIcon from "@mui/icons-material/Search";
import QueueMusicIcon from "@mui/icons-material/QueueMusic";
import { Link } from "react-router-dom";

function NavigationBar() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (drawerStatus) => {
    setOpen(drawerStatus);
  };

  useEffect(() => {
    console.log("re-rendered");
  }, []);

  const MenuItem = ({ icon, text, to }) => (
    <Link to={to} style={{ textDecoration: 'none', fontFamily: 'Raleway', color: 'black' }}>
      <ListItem button key={text} onClick={() => toggleDrawer(false)}>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text}/>
      </ListItem>
    </Link>
  );

  return (
    <Box
      sx={{
        width: "100vw",
        height: "8vh",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box sx={{ pl: "10px" }}>
        <img
          height="40px"
          width="auto"
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_RGB_White.png"
          alt="spotify Logo"
        />
      </Box>
      <Box sx={{ pr: "5%" }}>
        <Typography
          sx={{
            color: "white",
            fontWeight: "bold",
            fontFamily: "Raleway",
            fontSize: "30px",
          }}
        >
          Spotify React
        </Typography>
      </Box>
      <Box sx={{ pr: "10px" }}>
        <Box>
          <Avatar
            sx={{
              backgroundColor: "#521987",
              "&:hover": { cursor: "pointer" },
            }}
            onClick={() => toggleDrawer(true)}
          >
            U
          </Avatar>
          <Drawer
            variant="temporary"
            anchor="right"
            open={open}
            onClose={() => toggleDrawer(false)}
          >
            <Box sx={{ width: 250 }} role="presentation">
              <List>
                <ListItem key={"Username"}>
                  <Avatar sx={{ backgroundColor: "#521987", mr: "20px" }}>
                    <Typography>U</Typography>
                  </Avatar>
                  <ListItemText primary={"Username"} />
                </ListItem>
              </List>
              <Divider />
              <List>
                <MenuItem icon={<SearchIcon />} text="Search" to="/search" />
                <MenuItem
                  icon={<LibraryMusicIcon />}
                  text="Liked Tracks"
                  to="/savedTracks"
                />
                <MenuItem
                  icon={<QueueMusicIcon />}
                  text="Playlists"
                  to="/playlists"
                />
                <MenuItem
                  icon={<PersonIcon />}
                  text="Followed Artists"
                  to="/followedArtists"
                />
                <MenuItem
                  icon={<LibraryMusicIcon />}
                  text="Web Playback"
                  to="/playback"
                />
              </List>
            </Box>
          </Drawer>
        </Box>
      </Box>
    </Box>
  );
}
export default NavigationBar;
