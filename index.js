// Import required modules
const express = require('express');
const bodyParser = require('body-parser');


// Create an instance of Express
const app = express();
// Define the port number
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());


// Created a Mock Database - An array to store data
let mockDatabase = [
  { id: 1, name: 'Beni' },
  { id: 2, name: 'James' },
  { id: 3, name: 'Bryan' }
];

// Helper function to simulate delay
//holds one parameter "ms" which is the delay time in miliseconds 
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// GET /api/data - Retrieve all entries from the database
app.get('/api/data', async (req, res) => {
  await delay(100); // Simulate delay for 100ms
  res.json(mockDatabase); // Respond with the mock database
});



// POST /api/data - Add a new entry to the database
app.post('/api/data', async (req, res) => {
  const newEntry = req.body; // Get the new entry from the request body

  newEntry.id = mockDatabase.length ? mockDatabase[mockDatabase.length - 1].id + 1 : 1; // Assign a new ID
  await delay(100); // Simulate delay for 100ms
  mockDatabase.push(newEntry); // Add the new entry to the database
  res.status(201).json(newEntry); // Respond with the newly added entry
});



// PUT /api/data/:id - Update an existing entry in the database
// This route is designed to update an existing entry in a mock database based on the provided ID.
app.put('/api/data/:id', async (req, res) => {
  const id = parseInt(req.params.id); // Get the ID from the request parameters

  const updatedEntry = req.body; // Get the updated entry from the request body
  await delay(100); // Simulate delay for 100ms
  const index = mockDatabase.findIndex(entry => entry.id === id); // Find the index of the entry to update

  if (index !== -1) {
    mockDatabase[index] = { id, ...updatedEntry }; // Update the entry
     // If the entry exists, update it with the new values from the `updatedEntry` object.
    // The spread operator (`...`) is used to merge the properties of `updatedEntry` with the existing entry,
    // effectively overriding the old values with the new ones.
    res.json(mockDatabase[index]); // Respond with the updated entry
  } else {
    res.status(404).json({ message: 'Entry not found' }); // Respond with an error if entry not found
  }
});



// DELETE /api/data/:id - Delete an entry from the database
// This route is intended to delete an entry from a mock database based on the provided ID.
app.delete('/api/data/:id', async (req, res) => {
  const id = parseInt(req.params.id); // Get the ID from the request parameters

  //used for testing asynchronous behavior or to mimic real-world delays in processing requests
  await delay(100); // Simulate delay for 100ms
  const index = mockDatabase.findIndex(entry => entry.id === id); // Find the index of the entry to delete

  if (index !== -1) {
     // If the entry exists, remove it from the mock database using the `splice` method.
    const deletedEntry = mockDatabase.splice(index, 1); // Delete the entry
    res.json(deletedEntry[0]); // Respond with the deleted entry
  } else {
        // If the entry was not found in the database, respond with an HTTP status code of 404 (Not Found)
    res.status(404).json({ message: 'Entry not found' }); 
  }
});


// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



//Test Endpoints 

//GET URL: http://localhost:3000/api/data
//POST URL: http://localhost:3000/api/data
//PUT URL: http://localhost:3000/api/data/:id
//DELETE URL: http://localhost:3000/api/data/:id