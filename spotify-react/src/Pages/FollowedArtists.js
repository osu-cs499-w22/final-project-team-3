import React, { useState, useEffect } from 'react';
import CustomList from "../Components/CustomList";
import useFollowedArtistsSearch from "../hooks/followedArtists"

const headers = [
  {
    text1: "Artist",
    text2: "Followers",
    text3: "Main Genre",
    text4: "",
  },
];

var listContent = []


function FollowedArtists(props) {

    const [ artistList, loading ] = useFollowedArtistsSearch(props.token)

    artistList.map(artist =>
        listContent.push({
            text1: artist.name,
            text2: artist.followers.total,
            text3: artist.genres[0],
            text4: artist.images[2].url
        },)
    )

    return <CustomList title={"Followed Artists"} listContent={listContent} headers={headers} />;
}

export default FollowedArtists;
