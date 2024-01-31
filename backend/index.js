const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors')
const path = require('path');  // Añade esta línea
const config = require('./config.js');



// This enables the serving of static files
app.use('/phonebook', express.static('dist'));

// This enables the parsing of the body of the HTTP request
app.use(express.json())

// This is a custom token for morgan to log the body of the HTTP request
morgan.token('body', function (req, res) { return req.method === 'POST' ? JSON.stringify(req.body) : ''})
// This is a custom format for morgan to log the body of the HTTP request
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))
// Import cors
app.use(cors())


let persons = [
  {
    "name": "Arto Hellas",
    "number": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  },
  {
    "name": "Mary Poppendieck",
    "number": "39-23-6423122",
    "id": 4
  }
]

let router = express.Router();

// Define routes
router.get('/', function(req, res) {
	 // Construye la ruta absoluta al archivo
   const filePath = path.join(__dirname, 'dist', 'index.html');
  
   // Utiliza la ruta absoluta al archivo en sendFile
   res.sendFile(filePath);
});

router.get('/info', (request, response) => {
  // Create HTML
  const html = `
    <p>Phonebook has info for ${persons.length} people</p>
    <p>${new Date}</p>
  `
  // Send HTML
  response.send(html)
})

router.get('/api/persons', (request, response) => {
  // Return persons array
  response.json(persons);
})

router.post('/api/persons', (request, response) => {

  const person = {...request.body, id:generateId()}
  // Validate that person has name and number
  if (!person.name || !person.number) {
    // Return 400 (bad request)
    return response.status(400).json({error:"The person must have name and number"})
  }
  // Validate that person name is unique
  const nameExists = persons.find(p => p.name === person.name)
  if (nameExists) {
    // Return 400 (bad request)
    return response.status(400).json({error:"The person name must be unique"})
  }
  // Add new person
  persons.push(person)
  // Return new person
  response.json(person);
})

router.get('/api/persons/:id', (request, response) => {
  // Get id from request
  const id = Number(request.params.id);
  // Find person with id
  const person = persons.find(person => person.id === id)

  // If person exists, return it, else return 404
  if (person) {
    // Return person
    response.json(person);
  } else {
    // Return 404 (not found)
    response.status(404).end()
  }
})

router.delete('/api/persons/:id', (request, response) => {
  // Get id from request
  const id = Number(request.params.id);
  // Filter persons array to remove person with id
  persons = persons.filter(person => person.id !== id);
  // Return 204 (no content) 
  response.status(204).end()
})


// Start server
const PORT = process.env.PORT || 3001
// Listen to port
app.listen(PORT, () => {
  // Print message to console when server is started
  console.log(`Server running on port ${PORT}`)
})

app.use(config.baseUrl, router);


/**
 * Generates a random number between 5000 and 10000
 * @returns Random number between 5000 and 10000
 */
function generateId() {
  return Math.floor(Math.random() * (10000 - 5000 + 1) + 5000)
}