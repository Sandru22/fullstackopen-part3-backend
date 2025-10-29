const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

morgan.token('post-data', (req) => {
  if (req.method === 'POST' && req.body) {
    return JSON.stringify(req.body)
  }
  return ' '
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post-data'))
let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
  
  if (persons) {
    response.json(persons)
  } else {
    response.status(404).end()
  }
})

app.get('/info', (request, response) => {
    const currentTime = new Date().toString();
    response.send(`<p>Phonebook hase info for ${persons.length} people </p> 
                    <p> ${currentTime}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
  
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  persons = persons.filter(person => person.id !== id)

  response.status(204).end()
})

const generateId = () => {
  const id = Math.floor(Math.random() * 10000);
  return String(id)
}

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log('Request body:', request.body); 
    if (!body.name) {
    return response.status(400).json({ 
      error: 'name missing' 
    })
  }

  if(!body.number) {
    return response.status(400).json({
      error: 'number missing'
    })
  }

  const existingName = persons.find(person => person.name === body.name)

  if(existingName){
    return response.status(400).json({
      error: 'this name already exists'
    })
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(),
  }

  persons= persons.concat(person)
  console.log(person)
  response.json(person)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)