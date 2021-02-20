const router = require('express').Router();
let Habbit = require('../models/habbit.model');

router.route('/').get((req, res) => {
    Habbit.find()
    .then(habbits => res.json(habbits))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const type = req.body.type;
    const description = req.body.description;
    const trackingtype = req.body.trackingtype;
    const number = Number(req.body.number);
    const date = Date.parse(req.body.date);

    const newHabbit = new Habbit({
        username,
        type,
        description,
        trackingtype,
        number,
        date,
    });

    newHabbit.save()
    .then(() => res.json('Habbit added!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route(':id').get((req, res) => {
    Habbit.findById(req.params.id)
    .then(habbit => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route(':id').delete((req, res) => {
    Habbit.findByIdAndDelete(req.params.id)
    .then(exercise => res.json('Habbit deleted!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Habbit.findById(req.params.id)
    .then(habbit => {
        habbit.username = req.body.username;
        habbit.type = req.body.type;
        habbit.description = req.body.description;
        habbit.trackingtype = req.body.trackingtype;
        habbit.number = Number(req.body.number);
        habbit.date = Date.parse(req.body.date);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});


module.exports = router;