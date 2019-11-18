const express = require("express");
const router = express.Router();
let Exercise = require('../models/exercise.model');

router.get('/',(req, res) => {
    Exercise.find()
        .then(Exercises => res.json(Exercises))
        .catch(error => res.status(400).json('Error:' + error))
});

router.post('/add',(req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const duration = parseInt(req.body.duration);
    const date = Date.parse(req.body.date);

    const newExercise = new Exercise({ 
        username,
        description,
        duration,
        date
    });

    newExercise.save()
        .then(() => res.json('Exercise Added!'))
        .catch(error => res.status(400).json('Error' + error));
});


router.get('/:id',(req,res) => {
    Exercise.findById(req.params.id)
        .then(exercise => res.json(exercise))
        .catch(error => res.status(400).json('Error:'+ error))
});


router.delete('/:id', (req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json('Exercise deleted'))
        .catch(error => res.status(400).json('Error:' + error))
});

router.post('/update/:id',(req, res) => {
    Exercise.findById(req.params.id)
        .then(exercise => {
            exercise.username = req.body.username;
            exercise.description = req.body.description;
            exercise.duration = Number(req.body.duration);
            exercise.date = Date.parse(req.body.date);

            exercise.save()
                .then(() => res.json('Exercise updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;