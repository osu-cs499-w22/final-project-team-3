async function addRemoveArtist(token, id, type) {
    let responseBody = "";
    try {
        console.log(
            `${type}ING`,
            `https://api.spotify.com/v1/me/following?type=${id}`
        );
        const response = await fetch(
            `https://api.spotify.com/v1/me/following?type=${id}`,
            {
                method: `${type}`,
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        responseBody = await response.statusText;
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

export default addRemoveArtist;
