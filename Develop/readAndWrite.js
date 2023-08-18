const {readFile, writeFile} = require("fs")

const dbPath = "./db/db.json"

function readFileThenRun(res, runFunction){
  // Reads the file then runs the function
  readFile(dbPath, 'utf8', (error, file) => {
    if(error){
      res.status(500).send("Could not load db.json.")
      return
    }
    runFunction(file)
  })
}

function changeNotesThenWrite(res, file, changeFunction){
  // Convert the notes to an array of objects
  let notes = JSON.parse(file)
  // Changes the notes with the function
  notes = changeFunction([...notes]) // Pass by value
  // Convert the notes to json
  const jsonNotes = JSON.stringify(notes, null, 2)
  // Write the note to the db file
  writeFile(dbPath, jsonNotes, error => {
    if(error){
      res.status(500).send("Could not write to db.json.")
      return
    }
  })
}

module.exports = {
  readFileThenRun,
  changeNotesThenWrite,
}