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

        const { title, doc, imageUrl } = req.body

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
            author: req.user._id,
            imageUrl
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

//Update the documentation
router.post('/update/:id', auth, async (req, res) => {
    try {
        if (req.user.role !== 'admin') {
            return res.status(500).send({ msg: 'You are not authorized to this action' });
        }

        const document = await NewDoc.findById(req.params.id);

        if (!document) {
            res.status(500).send({ msg: 'No such doc found in the db' });
        }

        const doc = document.doc;

        const { data } = req.body;
        const countWords = (str) => {
            str = str.replace(/(^\s*)|(\s*$)/gi, "");
            str = str.replace(/[ ]{2,}/gi, " ");
            str = str.replace(/\n /, "\n");
            return str.split(' ').length;
        }

        let contentLength = 0;
        doc.forEach(d => {
            if (d._id === data._id) {
                d.text = data.text
            }
            const length = countWords(d.text);
            contentLength = contentLength + length;

        });

        await NewDoc.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    doc,
                    contentLength
                },
            },
            {
                new: true
            }
        )

        const finalDoc = await NewDoc.findById(req.params.id);

        if (!finalDoc) {
            return res.status(500).send({ msg: 'Error occured!' });
        }

        return res.status(200).send(finalDoc);

    } catch (error) {
        return res.status(500).send({ msg: error.message })
    }
})

router.delete('/:id', auth, async (req, res) => {
    try {
        let doc = await NewDoc.findById(req.params.id);

        if (!doc) {
            return res.status(404).send({ msg: 'No such doc available in the db' })
        }
        console.log(doc.author, req.user._id)

        if (doc.author.toString() !== req.user._id.toString()) {
            return res.status(500).send({ msg: 'Only the admin of this doc can delete it you are not authorized!' })

        }
        await NewDoc.findByIdAndDelete(req.params.id);

        doc = await NewDoc.findById(req.params.id);
        if (!doc) {
            return res.status(200).send({ msg: 'Doc successfully deleted!' })
        }

    } catch (error) {
        return res.status(500).send({ msg: error.message })

    }
})

module.exports = router;