const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());


// MongoDB Connection
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((error)=>{
    console.log("MongoDB Error:", error);
});



// Schema

const noteSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    content:{
        type:String,
        required:true
    },

    category:{
        type:String,
        default:"General"
    },

    pinned:{
        type:Boolean,
        default:false
    },

    createdAt:{
        type:Date,
        default:Date.now
    }

});


const Note = mongoose.model("Note",noteSchema);



// Test

app.get("/",(req,res)=>{

    res.send("Backend is running");

});



// Get notes

app.get("/notes",async(req,res)=>{

    try{

        const notes = await Note.find()
        .sort({pinned:-1});


        res.json(notes);

    }
    catch(error){

        res.status(500).json(error);

    }

});




// Add note

app.post("/notes",async(req,res)=>{

    try{


        const note = new Note({

            title:req.body.title,

            content:req.body.content,

            category:req.body.category

        });


        const saved = await note.save();


        res.json(saved);


    }
    catch(error){

        res.status(500).json(error);

    }

});




// Delete note

app.delete("/notes/:id",async(req,res)=>{


    await Note.findByIdAndDelete(req.params.id);


    res.json({
        message:"Deleted"
    });


});




// Pin / Update

app.put("/notes/:id",async(req,res)=>{


    const updated = await Note.findByIdAndUpdate(

        req.params.id,

        req.body,

        {new:true}

    );


    res.json(updated);


});





app.listen(5000,()=>{

    console.log("Server running on port 5000");

});