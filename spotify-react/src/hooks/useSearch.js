import React, { useState, useEffect } from 'react';

function useSearch(access_token, query, type) {
    const [ results, setResults ] = useState([]);
    const [ loading, setLoading ] = useState(false);

    useEffect(() => {
        let ignore = false;
        const controller = new AbortController();
        async function fetchSearchResults() {
            let responseBody = {};
            setLoading(true);
            const response = await fetch(
                `https://api.spotify.com/v1/search?q=${query}&type=${type}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
            }});
            responseBody = await response.json();

            console.log(responseBody)

            if(!ignore) {
                setLoading(false);
                if(type === 'track') {
                    setResults(responseBody.tracks.items || []);
                } else {
                    setResults(responseBody.artists.items || [])
                }
            }
        }
        fetchSearchResults()
        return () => {
            controller.abort();
            ignore = true;
        }
    }, [ access_token, query ]);

    return [results, loading];
}

export default useSearch