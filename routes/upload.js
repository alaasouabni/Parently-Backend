const cloudinary = require('cloudinary').v2;
const isAuthenticated = require('../middleware/isAuthenticated');
var express = require('express');
var router = express.Router();


router.post('/',isAuthenticated, async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr);
        console.log(uploadResponse);
        res.status(200).json(uploadResponse);
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

module.exports = router;