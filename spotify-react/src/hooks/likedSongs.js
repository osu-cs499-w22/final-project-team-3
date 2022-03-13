import React, { useState, useEffect } from "react";

async function fetchLikedSongs(token, offset) {
    var limit = 50;
    const controller = new AbortController();
    let responseBody = {};
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
        console.log("responsebody: ", responseBody);
        // console.log(responseBody.items);
    } catch (e) {
        if (e instanceof DOMException) {
            console.log("== HTTP request cancelled");
        } else {
            throw e;
        }
    }
    return responseBody.items;
}

export default fetchLikedSongs;
