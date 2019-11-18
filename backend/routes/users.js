const express = require("express");
const router = express.Router();
let User = require('../models/user.model');

router.get('/',(req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(error => res.status(400).json('Error: ' + error));
});

router.post('/add',(req, res) => {
    const username = req.body.username;
    const newUser = new User({ username: username });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(error => res.status(400).json('Error: ' + error));
});

module.exports = router;