const express = require('express');
const auth = require('../middleware/auth');
const EditedDocs = require('../models/EditedDocs');

const router = express.Router();

//Create a new edited doc
router.post('/', auth, async (req, res) => {
    try {
        const { _id, model, text, author } = req.body;

        const editedDoc = new EditedDocs({
            by: req.user._id,
            mainId: _id,
            text,
            model,
            author
        })

        await editedDoc.save();

        if (!editedDoc) {
            return res.status(500).send({ msg: "Some error occured!" })
        }

        res.status(200).send(editedDoc);


    } catch (error) {
        res.status(500).send({ msg: error.message })

    }
})

//Get edited doc via author id
router.get('/', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(500).send({ msg: 'You are not allowed this facility' })
        }

        const editedDocs = await EditedDocs.find({ author: req.user._id });

        if (!editedDocs) {
            return res.status(500).send({ msg: 'No docs need to be edited!' })
        }

        res.status(200).send(editedDocs);
    } catch (error) {
        res.status(500).send({ msg: error.message })

    }
})

//Get the edited doc via user id If he/she has edited a particular doc
router.get('/mydoc', auth, async (req, res) => {
    try {
        const editedDocs = await EditedDocs.find({ by: req.user._id });

        if (!editedDocs) {
            return res.status(404).send({ msg: 'you havent edited any docs yet!' })
        }

        res.status(200).send(editedDocs)

    } catch (error) {
        res.status(500).send({ msg: error.message })

    }
})

module.exports = router;