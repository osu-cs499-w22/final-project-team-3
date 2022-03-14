import React, { useState, useEffect } from "react";
import CustomList from "../Components/CustomList";
import fetchPlayists from "../hooks/userPlaylists";

const headers = [
    {
        text1: "Title",
        text2: "Song Count",
        text3: "Creator",
        text4: "Playlist Cover",
    },
];

function Playlists(props) {
    let token = props.token;
    const [offset, setOffset] = useState(0);
    const [listContent, setListContent] = useState([]);
    useEffect(() => {
        fetchPlayists(token, offset).then((playlists) => {
            let temp = [];
            if (playlists && playlists.length > 0)
                // this can be done using properies of map return
                playlists.map((playlist) => {
                    temp.push({
                        text1: playlist.name,
                        text2: playlist.tracks.total,
                        text3: playlist.owner.display_name,
                        text4: playlist.images[0].url,
                    });
                });
            setListContent(temp);
        });
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
    return (
        <div>
            <CustomList
                title={"Playlists"}
                listContent={listContent}
                headers={headers}
            />
            <button onClick={handlePrev}>prev</button>
            <button onClick={handleNext}>next</button>
        </div>
    );
}

export default Playlists;
