const express = require("express");
const request = require("request");
const dotenv = require("dotenv");
const cors = require("cors");

const port = 5000;

global.access_token = "";

dotenv.config();

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID;
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET;

var spotify_redirect_uri = "http://localhost:3000/auth/callback";

var generateRandomString = function (length) {
    var text = "";
    var possible =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

var app = express();

// Cors 
app.use(cors({
    origin: "http://localhost:3000",
}))

/* We are running the command `npx lyrics-searcher "song name" "artist name"` and then sending the
output to our endpoint. */
app.get('/lyrics', (req, res) => {

    // We want to run the command `npx lyrics-searcher "song name" "artist name"`
    // and then send the output to our endpoint
    var query = req.query.q;
    var artist = req.query.a;
    var command = "npx lyrics-searcher \"" + query + "\" \"" + artist + "\"";

    // Run the command
    var exec = require('child_process').exec;
    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.log(error);
            res.send("Error");
            return
        }
        res.send(stdout);
    });

})

app.get("/auth/login", (req, res) => {
    var scope = "streaming user-read-email user-read-private";

    var scope =
        "ugc-image-upload user-read-playback-state user-modify-playback-state user-read-private user-follow-modify user-follow-read user-library-modify user-library-read streaming user-read-playback-position playlist-modify-private playlist-read-collaborative app-remote-control user-read-email playlist-read-private user-top-read playlist-modify-public user-read-currently-playing user-read-recently-played";
    var state = generateRandomString(16);

    var auth_query_parameters = new URLSearchParams({
        response_type: "code",
        client_id: spotify_client_id,
        scope: scope,
        redirect_uri: spotify_redirect_uri,
        state: state,
    });

    res.redirect(
        "https://accounts.spotify.com/authorize/?" +
            auth_query_parameters.toString()
    );
});

app.get("/auth/callback", (req, res) => {
    var code = req.query.code;

    var authOptions = {
        url: "https://accounts.spotify.com/api/token",
        form: {
            code: code,
            redirect_uri: spotify_redirect_uri,
            grant_type: "authorization_code",
        },
        headers: {
            Authorization:
                "Basic " +
                Buffer.from(
                    spotify_client_id + ":" + spotify_client_secret
                ).toString("base64"),
            "Content-Type": "application/x-www-form-urlencoded",
        },
        json: true,
    };

    request.post(authOptions, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            access_token = body.access_token;
            res.redirect("/");
        }
    });
});

app.get("/auth/token", (req, res) => {
    res.json({ access_token: access_token });
});



app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});
