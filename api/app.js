const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

app = express();
const activeUsers = [];

app.use(bodyParser.json());
app.use(cors());

app.get('', (req, res) => {
  res.send('Hello World');
});

app.put('/api/update', (req, res) => {
    const {user} = req.body;
    const foundIndex = activeUsers.findIndex(usr => user.name === usr.name );
    if (foundIndex !== -1) {
        activeUsers[foundIndex].likedCharacters = user.likedCharacters;
        res.json(user);
    } else {
        activeUsers.push(user);
        res.json(user);
    }
});

app.post('/api/login', (req, res) => {
    const username = req.body.username;
    const activeUser = activeUsers.find( user => user.name === username);
    console.log(username, activeUsers);
    if (!activeUser) {
        const newUser = {name: username, likedCharacters: []};
        activeUsers.push(newUser);
        res.json(newUser);
    } else {
        res.json(activeUser);
    }
    console.log(activeUsers);
})

app.get('/api/characters', async (req,res, next) => {
    try {
        let url = `https://rickandmortyapi.com/api/character?name=`;
        const {name} = req.query;
        if (name) {
            url += `${name}`;
        }
        const result = await axios.get(url);
        console.log(Object.keys(result));
        return res.send(result.data);
    } catch(err) {
        console.log(err);
        res.send(err);
    }
});

app.listen(8080, () => {
  console.log('App running on port 8080');
});
