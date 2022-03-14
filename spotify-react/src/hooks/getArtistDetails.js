import React, { useState, useEffect } from "react";
async function getArtistDetails(token, id) {
    let responseBody = {};
    try {
        console.log(
            "fetching",
            `https://api.spotify.com/v1/artists/${id}`
        );
        const response = await fetch(
            `https://api.spotify.com/v1/artists/${id}`,
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
    return responseBody;
}

export default getArtistDetails;
