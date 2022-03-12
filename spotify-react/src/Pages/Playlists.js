import React from "react";
import CustomList from "../Components/CustomList";

const headers = [
  {
    text1: "Title",
    text2: "Song Count",
    text3: "Total Time",
    text4: "Playlist Cover",
  },
];

const listContent = [
    {
        text1: 'Top 100',
        text2: '100',
        text3: '5 hours',
        text4: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtRyJ0fPYAtG0bS0AUAyQJbRSOxI4077LpSA&usqp=CAU'
    },
    {
        text1: 'Sad Songs',
        text2: '10',
        text3: '30 mins',
        text4: 'https://i.pinimg.com/736x/1d/8e/05/1d8e0596b6f9be634268268081662815.jpg'
    },
    {
        text1: 'Workout',
        text2: '1000',
        text3: '1 day',
        text4: 'https://www.greatmats.com/images/rubber-gym-flooring/domination-gym-install.webp'
    },
]


function Playlists() {
    return <CustomList title={"Playlists"} listContent={listContent} headers={headers} />;
}

export default Playlists;
