const  multer = require('multer')
const fs = require('fs')
const router = require('express').Router()
const topi = require('../controller/topi')

var storage = multer.diskStorage({
    filename: function (req, file, cb) {
        let ext = file.originalname.substring(
            file.originalname.lastIndexOf("."),
            file.originalname.length
        )
        cb(null, Date.now() + ext);
    },
    destination: function (req, file, cb) {
        cb(null, './gambar')
    }
})

var upload = multer({storage: storage}).single("gambar")

router.post( "/input" , upload, (req, res) => {
    topi.inputDataTopi(req.body, req.file.filename)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.get("/datatopi", (req, res) => {
    topi.lihatDataTopi()
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.get("/datatopi/:id", (req, res) => {
    topi.lihatDetailDataTopi(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.delete("/hapus/:id", (req, res) => {
    topi.hapustopi(req.params.id)
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

router.put("/ubah/:id", upload, (req, res) => {
    let fileName;
    if (!req.body.gambar) {
        fileName = req.file.filename;
    } else {
        fileName = req.body.gambar;
    }
    topi.updateTopi(req.params.id, req.body, fileName )
        .then((result) => res.json(result))
        .catch((err) => res.json(err))
})

module.exports = router
