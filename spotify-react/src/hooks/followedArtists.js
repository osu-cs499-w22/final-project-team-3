import React, { useState, useEffect } from "react";

async function fetchFollowedArtists(access_token, apiUrl) {
    var limit = 50;
    console.log("apiUrl: " + apiUrl);
    let responseBody = {};
    try {
        console.log("fetching", `${apiUrl}`);

        const response = await fetch(`${apiUrl}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${access_token}`,
            },
        });
        responseBody = await response.json();
        console.log("responsebody: ", responseBody);
    } catch (e) {
        if (e instanceof DOMException) {
            console.log("== HTTP request cancelled");
        } else {
            throw e;
        }
    }
    return responseBody.artists;
}

export default fetchFollowedArtists;
