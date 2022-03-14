import React, { useState, useEffect } from 'react';
import CustomList from "../Components/CustomList";
import fetchFollowedArtists from "../hooks/followedArtists"

const headers = [
  {
    text1: "Artist",
    text2: "Followers",
    text3: "Main Genre",
    text4: "",
  },
];

let artists = []
function FollowedArtists(props) {

    const token = props.token
    const [ offset, setOffset ] = useState(0);
    const [ listContent, setListContent ] = useState([])

    useEffect(() => {
        fetchFollowedArtists(token, offset).then((artists) => {
            let temp = [];
            console.log(artists);
            if(artists && artists.length > 0)
                artists.map((artist) => {
                    console.log(artist);
                    temp.push({
                        text1: artist.name,
                        text2: artist.followers.total,
                        text3: artist.genres[0],
                        text4: artist.images[2].url
                    });
                });
            setListContent(temp);
            console.log(listContent)
        })
    }, [token, offset]);

    function handlePrev() {
        if (offset < 50) {
            console.log("cannot decrement further... At list beginning");
        } else {
            setOffset(offset - 50);
        }
    }

    function handleNext() {
        setOffset(offset + 50);
    }

    console.log("listContent", listContent);

    return (
        <div>
            <CustomList title={"Followed Artists"} listContent={listContent} headers={headers} />
            <button onClick={handlePrev}>prev</button>
            <button onClick={handleNext}>next</button>
        </div>
    )
}

export default FollowedArtists;
