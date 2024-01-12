//-----------------------------
//#region Database Connection
//-----------------------------
const path = require("path");
const sqlite = require("sqlite3").verbose();
const dbFile = path.join(__dirname, "foo.db");
const db = new sqlite.Database(dbFile, (error) => {
  if (error) return console.error(error.message);
  console.log(`Connected to database ${dbFile}`);
});

//#endregion Database Connection

//-----------------------------
//#region Routes
//-----------------------------
/**
 * Gets a single user by id
 */
const getUserById = (request, response) => {
  // Parse the id to generate a SQLite query
  const id = parseInt(request.params.id);
  //runs this sequel statement whe called: 
  const query = `SELECT * FROM user WHERE id = ?`;
  console.log(query);

  // db.get will replace all ? in query sequentially with
  // items from the array passed as the second parameter
  // and then run the callback function passed as the third param
  // What does the callback function do?
  db.get(query, [id], (error, result) => {
    if (error) {
      console.error(error.message);
      response.status(400).json({ error: error.message });
      return;
    }
    // If nothing is returned, then result will be undefined
    if (result) {
      response.json(result);
    } else {
      response.sendStatus(404);
    }
  });
};

// ----- FILL IN BELOW -----
// Write and export the rest of the functions needed by index.js!

//get all 
const getAllUsers = (request, response) => {
  const query = `SELECT * FROM user`;

  db.all("SELECT * FROM user", (err, result)=> {
    console.log(result);
    if (error) {
      console.error(error.message);
      response.status(400).json({ error: error.message });
      return;
    }
    if (result) {
      response.json(result);
    } else {
      response.sendStatus(404);
    }
  });
};

//insert 
const insertUser = (request, response) => {
  const name = request.params.name;
  const id = parseInt(request.params.id);
  const query = "INSERT INTO users VALUES (?, ?)";

  //id first and then names so thats the order in array
  db.get(query, [id,name], (err, result) => {
    
    if (error) {
      console.error(error.message);
      response.status(400).json({ error: error.message });
      return;
    }
    // If nothing is returned, then result will be undefined
    if (result) {
      response.json(result);
    } else {
      response.sendStatus(404);
    }
})

}

//update name: 
const updateName = (request, response) => {
  const id = parseInt(request.params.id);
  const name = request.params.name;
  //check if this query is right 
  const query = "UPDATE users SET name = ? WHERE id = ?";

  db.get(query, [id,name],(error, result) => {
    if (error) {
      console.error(error.message);
      response.status(400).json({ error: error.message });
      return;
    }
    // If nothing is returned, then result will be undefined
    if (result) {
      response.json(result);
    } else {
      response.sendStatus(404);
    }
  } );
}

//delete by id
const del = (request, result) => {
  const id = parseInt(request.params.id);
  const query = "DELTE FROM users WHERE id = ?";

  db.run(query, [id], (error, result) => {
    if (error) {
      console.error(error.message);
      response.status(400).json({ error: error.message });
      return;
    }
    // If nothing is returned, then result will be undefined
    if (result) {
      response.json(result);
    } else {
      response.sendStatus(404);
    }
  })
}



//#endregion Routes

// This allows `index.js` to use functions defined in this file.
module.exports = {
  getUserById,
};

module.exports = {
  getAllUsers,
};
module.exports = {
  insertUser,
};
module.exports = {
  updateName,
};
module.exports = {
  del,
};
