const express = require('express');
const Comments = require('../models/Comments');
const auth = require('../middleware/auth');

const router = express.Router();

//Create a new comment
router.post('/', auth, async (req, res) => {
    try {
        const { on, text } = req.body;

        const newComment = new Comments({
            model: on,
            text,
            by: req.user._id
        })
        await newComment.save();

        res.status(200).send(newComment);

    } catch (error) {
        res.status(500).send({ msg: error.message });
    }
})

//Get comments for a particular doc
router.get('/:id', auth, async (req, res) => {
    try {
        const comments = await Comments.find({ model: req.params.id }).populate('by', 'name _id imageUrl');

        if (!comments) {
            return res.status(404).send({ msg: 'No comments yet!' })
        }

        res.status(200).send(comments);


    } catch (error) {
        res.status(500).send({ msg: error.message });

    }
})

//Get that current users comment
router.get('/comment/myComments', auth, async (req, res) => {
    try {
        console.log(res.locals.user)
        const comments = await Comments.find({ by: req.user._id });

        if (!comments) {
            return res.status(404).send({ msg: 'No comments made by you yet!' })
        }

        res.status(200).send(comments);


    } catch (error) {
        res.status(500).send({ msg: error.message });

    }
})


//Delete a single comment
router.delete('/:id', auth, async (req, res) => {
    try {
        const comment = await Comments.findById(req.params.id);

        await Comments.findByIdAndDelete(req.params.id);

        res.status(200).send({ msg: 'Comment deleted successfully' })
    } catch (error) {
        res.status(500).send({ msg: error.message });

    }
})

module.exports = router;