/** @jsxImportSource @emotion/react */
import React from "react";
import { useState } from "react";
import { Box, Typography, Avatar, List, ListItem, ListItemIcon, ListItemText, Divider, Drawer } from '@mui/material'
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import QueueMusicIcon from '@mui/icons-material/QueueMusic';
// import { useNavigate } from "react-router-dom";

function NavigationBar() {
    // let navigate = useNavigate();

    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
      });
    
      const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
      };
    
      const list = (anchor) => (
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleDrawer(anchor, false)}
          onKeyDown={toggleDrawer(anchor, false)}
        >
          <List>
            {["Logout of Username"].map((text, index) => (
              <ListItem button key={text}>
                <Avatar sx={{ backgroundColor: "#521987", mr: "20px" }}>
                  U
                </Avatar>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            <ListItem button key="Search" >
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItem>
            <ListItem button key="Playlists" >
              <ListItemIcon>
                <QueueMusicIcon />
              </ListItemIcon>
              <ListItemText primary="Playlists" />
            </ListItem>
            <ListItem button key="Saved Tracks" >
              <ListItemIcon>
                <LibraryMusicIcon />
              </ListItemIcon>
              <ListItemText primary="Saved Tracks" />
            </ListItem>
            <ListItem button key="Followed Artists" >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Followed Artists" />
            </ListItem>
          </List>
        </Box>
      );

    //   onClick={navigate('/search')}

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
              fontFamily: "Vision",
              fontSize: "30px",
            }}
          >
            Spotify React
          </Typography>
        </Box>
        <Box sx={{ pr: "10px" }}>
          <React.Fragment key={"right"}>
            <Box onClick={toggleDrawer("right", true)}>
              <Avatar sx={{ backgroundColor: "#521987", "&:hover": { cursor: "pointer" } }}>U</Avatar>
              <Drawer
                anchor={'right'}
                open={state['right']}
                onClose={toggleDrawer('right', false)}
              >
                {list('right')}
              </Drawer>
            </Box>
          </React.Fragment>
        </Box>
      </Box>
    );
}
export default NavigationBar;
