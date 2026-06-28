const express = require("express");
const router = express.Router();

const Note = require("../models/Note");


router.get("/", async(req,res)=>{
    const notes = await Note.find();
    res.json(notes);
});


router.post("/", async(req,res)=>{
    const note = new Note(req.body);
    await note.save();
    res.json(note);
});


module.exports = router;