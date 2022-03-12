import React from "react";
import CustomList from "../Components/CustomList";

const headers = [
  {
    text1: "Artist",
    text2: "Liked Songs",
    text3: "Liked Albums",
    text4: "",
  },
];

const listContent = [
    {
        text1: 'Kanye West',
        text2: '100',
        text3: '5',
        text4: 'https://thisis-images.scdn.co/37i9dQZF1DZ06evO3nMr04-default.jpg'
    },
    {
        text1: 'Kid Cudi',
        text2: '10',
        text3: '2',
        text4: 'https://thisis-images.scdn.co/37i9dQZF1DZ06evO04TCIU-default.jpg'
    },
    {
        text1: 'Mac Miller',
        text2: '1',
        text3: '1',
        text4: 'https://i.scdn.co/image/ab6761610000e5ebed3b89aa602145fde71a163a'
    },
]


function FollowedArtists() {
    return <CustomList title={"Followed Artists"} listContent={listContent} headers={headers} />;
}

export default FollowedArtists;
