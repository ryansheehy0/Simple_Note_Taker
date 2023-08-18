const {v4: randomUUID} = require("uuid")

function matchesAnId(ids, match){
  ids.forEach(id => {
    if(id === match){
      return true
    }
  })
  return false
}

function getNewUUID(allIds){
  // Get a new uuid
  let uuid = randomUUID()

  // If the generated uuid is the same as an id then regenerate another uuid
    // Keep doing this until you get a truly unique id
  while(matchesAnId(allIds, uuid)){
    uuid = randomUUID()
  }

  // Return the truly unique id
  return uuid
}

module.exports = getNewUUID