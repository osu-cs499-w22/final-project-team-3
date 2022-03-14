import React, { useState, useEffect } from "react";
async function fetchPlaylistTracks(token, id, offset) {
    let responseBody = {};
    try {
        // asdlgkas
        console.log(
            "fetching",
            `https://api.spotify.com/v1/playlists/${id}/tracks?offset=${offset}&limit=100`
        );
        const response = await fetch(
            `https://api.spotify.com/v1/playlists/${id}/tracks?offset=${offset}&limit=100`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        responseBody = await response.json();
        console.log("tracks responsebody: ", responseBody);
    } catch (e) {
        if (e instanceof DOMException) {
            console.log("== HTTP request cancelled");
        } else {
            throw e;
        }
    }
    return responseBody.items;
}

export default fetchPlaylistTracks;
