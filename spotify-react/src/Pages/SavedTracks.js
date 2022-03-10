import { Typography } from "@mui/material";
import React from "react";
import CustomList from "../Components/CustomList";

const headers = [
  {
    text1: "Title",
    text2: "Artist",
    text3: "Album",
    text4: "Album Cover",
  },
];

const listContent = [
    {
        text1: 'Through The Wire',
        text2: 'Kanye West',
        text3: 'The College Dropout',
        text4: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/kanye-west-cover-of-the-college-dropout-danendra-hardyatama.jpg'
    },
    {
        text1: 'Day n Nite',
        text2: 'Kid Cudi',
        text3: 'Man on the Moon',
        text4: 'https://upload.wikimedia.org/wikipedia/en/2/26/ManonTheMoonTheEndofDay.jpg'
    },
    {
        text1: 'The Spins',
        text2: 'Mac Miller',
        text3: 'K.I.D.S.',
        text4: 'https://images-na.ssl-images-amazon.com/images/I/61HCisJf1NL._AC_UL600_SR600,600_.jpg'
    },
    {
        text1: 'Through The Wire',
        text2: 'Kanye West',
        text3: 'The College Dropout',
        text4: 'https://images.fineartamerica.com/images/artworkimages/mediumlarge/1/kanye-west-cover-of-the-college-dropout-danendra-hardyatama.jpg'
    },
]


function SavedTracks() {
    return <CustomList title={"Liked Songs"} listContent={listContent} headers={headers} />;
}

export default SavedTracks;
