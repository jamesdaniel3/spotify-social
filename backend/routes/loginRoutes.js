const express = require('express');
const router = express.Router();
const queryString = require('querystring');
const axios = require('axios');
const db = require('../firebase');
const admin = require('firebase-admin');
const { FieldValue } = admin.firestore;

const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectURI = process.env.REDIRECT_URI;

const generateRandomString = length => {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
};

const stateKey = 'spotify_auth_state';

router.get('/login', (req, res) => {
    const state = generateRandomString(16);
    res.cookie(stateKey, state);

    const scope = [
        'user-read-private',
        'user-read-email',
        'user-top-read',
        'user-library-read',
    ].join(' ');

    const queryParams = queryString.stringify({
        client_id: clientId,
        response_type: 'code',
        redirect_uri: redirectURI,
        state: state,
        scope: scope,
    });
    res.redirect(`https://accounts.spotify.com/authorize?${queryParams}`);
});

router.get('/callback', (req, res) => {
    const code = req.query.code || null;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: queryString.stringify({
            grant_type: 'authorization_code',
            code: code,
            redirect_uri: redirectURI
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
        },
    }).then(response => {
        if (response.status === 200) {
            const { access_token, refresh_token, expires_in } = response.data;
            const queryParams = queryString.stringify({
                access_token,
                refresh_token,
                expires_in,
            });
            res.redirect(`http://localhost:5173/?${queryParams}`);
        } else {
            res.redirect(`/?${queryString.stringify({ error: 'invalid_token' })}`);
        }
    }).catch(error => {
        res.send(error);
    });
});

router.get('/refresh_token', (req, res) => {
    const { refresh_token } = req.query;

    axios({
        method: 'post',
        url: 'https://accounts.spotify.com/api/token',
        data: queryString.stringify({
            grant_type: 'authorization_code',
            refresh_token: refresh_token
        }),
        headers: {
            'content-type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`
        },
    })
        .then(response => {
            res.send(response.data);
        })
        .catch(error => {
            res.send(error);
        });
});

module.exports = router;
