import React, { useEffect, useState } from "react";
import getArtistDetails from "../hooks/getArtistDetails";
function ArtistDetails(props) {
    const token = props.token
    const [ artistContent, setArtistContent ] = useState({})

    useEffect(() => {
        getArtistDetails(token, "26VFTg2z8YR0cCuwLzESi2").then((details) => {
            setArtistContent({
                name: details.name,
                external_url: details.external_urls.spotify,
                followers: details.followers,
                genres: details.genres,
                image: details.images[0].url,
            })
        })
    }, [token])
    
    console.log("ArtistDetails: ", artistContent)
    return <h1>ArtistDetails</h1>;
}

export default ArtistDetails;
