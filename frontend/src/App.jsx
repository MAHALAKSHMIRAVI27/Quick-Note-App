import {useState,useEffect} from "react";
import axios from "axios";
import "./App.css";


function App(){


const [notes,setNotes]=useState([]);

const [title,setTitle]=useState("");

const [content,setContent]=useState("");

const [category,setCategory]=useState("General");

const [search,setSearch]=useState("");

const [dark,setDark]=useState(false);




// Get notes

const getNotes = async()=>{

    try{

        const res = await axios.get(
            "http://localhost:5000/notes"
        );

        setNotes(res.data);

    }
    catch(error){

        console.log(error);

    }

};




// Fixed useEffect

useEffect(()=>{


    const loadNotes = async()=>{

        await getNotes();

    };


    loadNotes();


},[]);





// Add note

const addNote = async()=>{


if(!title || !content){

alert("Enter title and content");

return;

}



await axios.post(

"http://localhost:5000/notes",

{

title,

content,

category

}

);



setTitle("");

setContent("");

getNotes();


};




// Delete

const deleteNote = async(id)=>{


await axios.delete(

`http://localhost:5000/notes/${id}`

);


getNotes();


};





// Pin

const pinNote = async(note)=>{


await axios.put(

`http://localhost:5000/notes/${note._id}`,

{

pinned:!note.pinned

}

);


getNotes();


};






const filteredNotes = notes.filter((note)=>

note.title.toLowerCase()
.includes(search.toLowerCase())

);





return(


<div className={dark?"container dark":"container"}>


<button onClick={()=>setDark(!dark)}>

🌙 Dark Mode

</button>



<h1>📝 Quick Note App</h1>



<input

placeholder="Search note"

value={search}

onChange={(e)=>setSearch(e.target.value)}

/>



<input

placeholder="Title"

value={title}

onChange={(e)=>setTitle(e.target.value)}

/>



<textarea

placeholder="Write note"

value={content}

onChange={(e)=>setContent(e.target.value)}

/>



<select

value={category}

onChange={(e)=>setCategory(e.target.value)}

>

<option>General</option>

<option>Study</option>

<option>Work</option>

<option>Personal</option>


</select>




<button onClick={addNote}>

Add Note

</button>





<h2>My Notes</h2>




{

filteredNotes.map((note)=>(


<div className="note-card" key={note._id}>


<h3>

{note.pinned && "📌"}

{note.title}

</h3>


<p>{note.content}</p>


<p>

Category: {note.category}

</p>


<small>

{new Date(note.createdAt)
.toLocaleString()}

</small>


<br/>


<button onClick={()=>pinNote(note)}>

Pin

</button>



<button onClick={()=>deleteNote(note._id)}>

Delete

</button>


</div>



))

}



</div>


);


}


export default App;