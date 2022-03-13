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

var listContent = []

function FollowedArtists({ token }) {

    const [ artistList, loading ] = useFollowedArtistsSearch(token)

    console.log("loading again")

    if (artistList && artistList.length > 0 && (listContent.length == 0 || listContent[0].text1 !== artistList[0].name)) {
        artistList.map(artist =>
            listContent.push({
                text1: artist.name,
                text2: artist.followers.total,
                text3: artist.genres[0],
                text4: artist.images[2].url
            },)
            // && console.log("Pushing", artist.name),
        )
    }

    console.log(listContent)

    return ( loading ? <div /> :
        <CustomList title={"Followed Artists"} listContent={listContent} headers={headers} />
    )
}

export default FollowedArtists;
