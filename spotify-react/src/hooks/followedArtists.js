import React, { useState, useEffect } from 'react';

function useFollowedArtistsSearch(access_token) {
    const [ artists, setArtists ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    const controller = new AbortController();
    useEffect(() => {
        async function fetchSearchResults() {
            let responseBody = {};
            setLoading(true);
            const response = await fetch(
                `https://api.spotify.com/v1/me/following?type=artist`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
            }});
            responseBody = await response.json();
            console.log(responseBody.artists.items)
            setLoading(false);
            setArtists(responseBody.artists.items || []);
        }
        fetchSearchResults()
        return () => {
            controller.abort();
        }
    }, [ access_token ]);

    return [artists, loading];
}

export default useFollowedArtistsSearch