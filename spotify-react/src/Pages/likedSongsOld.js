import React, { useState, useEffect } from "react";

function useLikedSongs(token, offset) {
    const [songs, setSongs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    var limit = 50;
    useEffect(() => {
        const controller = new AbortController();
        async function fetchLikedSongs() {
            let responseBody = {};
            setLoading(true);
            try {
                console.log(
                    "fetching",
                    `https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`
                );
                const response = await fetch(
                    `https://api.spotify.com/v1/me/tracks?limit=${limit}&offset=${offset}`,
                    {
                        method: "GET",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                responseBody = await response.json();
                if (responseBody.cod === "404" || responseBody.cod === "400") {
                    setError(true);
                }
                console.log("responsebody: ", responseBody);
                console.log(responseBody.items);
                setLoading(false);
                setSongs(responseBody.items || []);
            } catch (e) {
                if (e instanceof DOMException) {
                    console.log("== HTTP request cancelled");
                } else {
                    setError(true);
                    throw e;
                }
            }
        }
        fetchLikedSongs();
    }, [offset]);

    return [songs, loading, error];
}

export default useLikedSongs;
