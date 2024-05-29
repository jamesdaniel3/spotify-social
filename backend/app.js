require(`dotenv`).config();
const express = require(`express`);
const queryString = require(`querystring`);
const axios = require(`axios`);
const app = express();
const port = 8888;

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectURI = process.env.REDIRECT_URI;
console.log(redirectURI)

const generateRandomString = length => {
    let text = ``;
    const possible = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789`;

    for(let i = 0; i < length; i++){
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

const stateKey = `spotify_auth_state`

app.get(`/login`, (request, response) => {
    const state = generateRandomString(16)
    response.cookie(stateKey, state)

    const scope = `user-read-private user-read-email`

    const queryParams = queryString.stringify({
        client_id: clientId,
        response_type: `code`,
        redirect_uri: redirectURI,
        state: state,
        scope: scope,
    })
    response.redirect(`https://accounts.spotify.com/authorize?${queryParams}`)
})

app.get(`/callback`, (req, res) => {
    const code = req.query.code || null;

    axios({
        method: `post`,
        url: `https://accounts.spotify.com/api/token`,
        data: queryString.stringify({
            grant_type: `authorization_code`,
            code: code,
            redirect_uri: redirectURI
        }),
        headers: {
            'content-type': `application/x-www-form-urlencoded`,
            Authorization: `Basic ${new Buffer.from(`${clientId}:${clientSecret}`).toString(`base64`)}`
        },
    }).then(response => {
        if(response.status === 200){
            const { access_token, refresh_token, expires_in} = response.data;

            const queryParams = queryString.stringify({
                access_token,
                refresh_token,
                expires_in,
            })

            res.redirect(`http://localhost:5173/?${queryParams}`)


        } else{
            res.redirect(`/?${queryString.stringify({ error: `invalid_token`})}`)
        }
    }).catch(error => {
        res.send(error)
    })
})

app.get(`/refresh_token`, (req, res) => {
    const { refresh_token } = req.query;

    axios({
        method: `post`,
        url: `https://accounts.spotify.com/api/token`,
        data: queryString.stringify({
            grant_type: `authorization_code`,
            refresh_token: refresh_token
        }),
        headers: {
            'content-type': `application/x-www-form-urlencoded`,
            Authorization: `Basic ${new Buffer.from(`${clientId}:${clientSecret}`).toString(`base64`)}`
        },
    })
        .then(response => {
            res.send(response.data)
        })
        .catch(error => {
            res.send(error)
        })
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})