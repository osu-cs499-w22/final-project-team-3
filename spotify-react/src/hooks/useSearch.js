import React, { useState, useEffect } from 'react';

async function fetchSearchResults(token, query, type, offset) {
    var limit = 50;
    let responseBody = {}
    try {
        console.log(
            "fetching",
            `https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=${limit}&offset=${offset}`
        );
        const response = await fetch(
            `https://api.spotify.com/v1/search?q=${query}&type=${type}&limit=${limit}&offset=${offset}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        responseBody = await response.json();
        console.log("responsebody: ", responseBody);
    } catch (e) {
        if (e instanceof DOMException) {
            console.log("== HTTP request cancelled");
        } else {
            throw e;
        }
    }
    return (type === 'track') ? responseBody.tracks.items : responseBody.artists.items
}

export default fetchSearchResults;