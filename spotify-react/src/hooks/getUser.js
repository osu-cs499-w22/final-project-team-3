import React, { useState, useEffect } from "react";
async function fetchUser(token, offset) {
    console.log("fetchUser");
    console.log("token: ", token);
    let responseBody = {};
    try {
        console.log("fetching https://api.spotify.com/v1/me");
        const response = await fetch(`https://api.spotify.com/v1/me`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        responseBody = await response.json();
        // console.log("user response: ", responseBody);
    } catch (e) {
        if (e instanceof DOMException) {
            console.log("== HTTP request cancelled");
        } else {
            throw e;
        }
    }
    return responseBody;
}

export default fetchUser;
