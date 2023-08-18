const express = require("express")
const path = require("path")
const {readFileThenRun, changeNotesThenWrite} = require("./readAndWrite")
const getNewUUID = require("./newUUID")

const app = express()

// Middleware
app.use(express.json())
app.use(express.static("public"))

// HTTP functions
app.get("/notes", (req, res) => {
  // Send notes html page
  res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", (req, res) => {
  // return the json of the db
  readFileThenRun(res, file => {
    res.json(file)
  })
})

app.post("/api/notes", (req, res) => {
  readFileThenRun(res, file => {
    changeNotesThenWrite(res, file, notes => {
      // Get all the IDs in the notes
      const allIds = notes.map(note => {
        return note.id
      })
      // Get a new UUID
      const uuid = getNewUUID(allIds)
      // Add a uuid to the new note
      req.body.id = uuid
      // Add the new note
      notes.push(req.body)
      // Return the note with the id so it can be written to the file
      return notes
    })
    res.json(req.body)
  })
})

app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id
  readFileThenRun(res, file => {
    changeNotesThenWrite(res, file, notes => {
      // Remove the note with the id from the parameter
      return notes.filter(note => {
        if(note.id === id){
          return false
        }
      })
    })
    res.send(`Deleted ${id}`)
  })
})

app.get("*", (req, res) => {
  // Send index html page
  res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.listen(3000, () => {
  console.log("Listening on port 3000.")
})