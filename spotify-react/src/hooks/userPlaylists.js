import React, { useState, useEffect } from "react";
import getUser from "./getUser";

async function fetchPlayists(token, offset) {
    let user = await getUser(token);
    let userPlaylists = await fetchUserPlaylists(token, offset, user);
    console.log("userPlaylists", userPlaylists);
    return userPlaylists;
}

async function fetchUserPlaylists(token, offset, user) {
    // console.log("fetchUserPlaylists");
    console.log("api Offset: ", offset);
    var limit = 50;
    let responseBody = {};
    try {
        console.log(
            "fetching",
            `https://api.spotify.com/v1/users/${user.id}/playlists%20?${limit}&offset=${offset} `
        );
        const response = await fetch(
            `https://api.spotify.com/v1/users/${user.id}/playlists?limit=${limit}&offset=${offset}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        responseBody = await response.json();
        // console.log("playlist Reponse: ", responseBody);
    } catch (e) {
        if (e instanceof DOMException) {
            console.log("== HTTP request cancelled");
        } else {
            throw e;
        }
    }
    return responseBody.items;
}

export default fetchPlayists;
