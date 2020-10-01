const express = require('express');
const { v4: uuidv4 } = require('uuid')
const User = require('../models/User')
const NewDoc = require('../models/NewDoc')
const auth = require('../middleware/auth')

const router = express.Router()


//Create a new documentation
router.post('/', auth, async (req, res) => {

    try {

        if (req.user.role !== 'admin') {
            return res.status(500).send({ msg: 'You are not authorized to avail this service' });
        }

        const { title, doc } = req.body

        const countWords = (str) => {
            str = str.replace(/(^\s*)|(\s*$)/gi, "");
            str = str.replace(/[ ]{2,}/gi, " ");
            str = str.replace(/\n /, "\n");
            return str.split(' ').length;
        }

        let contentLength = 0;

        doc.forEach(d => {
            d["_id"] = uuidv4();
            const length = countWords(d.text);
            contentLength = contentLength + length;
        });


        const document = new NewDoc({
            title,
            doc,
            contentLength,
            author: req.user._id
        })

        await document.save();

        console.log(document);
        res.status(200).send(document);

    } catch (error) {
        res.status(500).send({ msg: error.message })
    }
})

//Get a documentation via id
router.get('/:id', auth, async (req, res) => {
    try {
        const doc = await NewDoc.findById(req.params.id);
        if (!doc) {
            return res.status(404).send({ msg: 'No such documentation found in db' })
        }

        return res.status(200).send(doc);

    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
})

module.exports = router;