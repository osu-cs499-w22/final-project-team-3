import React, { useState, useEffect } from 'react';

async function fetchFollowedArtists(access_token, offset) {
    var limit = 50;
    let responseBody = {};
    try {
        console.log(
            "fetching",
            `https://api.spotify.com/v1/me/following?type=artist&limit=${limit}&offset=${offset}`
        );

        const response = await fetch(
            `https://api.spotify.com/v1/me/following?type=artist&limit=${limit}&offset=${offset}`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${access_token}`
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
    return responseBody.artists.items;
}

export default fetchFollowedArtists