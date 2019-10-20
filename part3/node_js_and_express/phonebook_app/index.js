const express = require('express');

const app = express();

let persons = [
      {
        name: "Arto Hellas",
        number: "040-123456",
        id: 1
      },
      {
        name: "Ada Lovelace",
        number: "39-44-5323523",
        id: 2
      },
      {
        name: "Dan Abramov",
        number: "12-43-234345",
        id: 3
      },
      {
        name: "Mary Poppendieck",
        number: "39-23-6423122",
        id: 4
      }
    ]

app.get('/api/persons',(req,res) => {
    res.json(persons)
});

app.get('/api/persons/:id',(req,res)=>{
  const id = req.params.id;
  const filtered_items = persons.filter((person) => {
  if(person.id == id) {
    return person
  }
  })
  if (filtered_items.length > 0) {
    res.json(filtered_items)
  }
  else {
    res.send('Not found')
  }
});

app.delete('/api/persons/:id',(req,res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end()
})

app.post('/api/persons',(req,res) => {
  const body = req.body;
  const person = {
    name : body.name,
    number : body.number,
    id : Math.floor(Math.random(1000))
  }
  persons = persons.concat(person);
  res.json(persons)
})

app.get('/info',(req,res) => {
  const current_time = new Date();
  res.send(`Phonebook has info for ${persons.length} people`+ '<br/>' + `${current_time}`)
});

const port = 3001;

app.listen(port,() => {
    console.log(`Server is running on port ${port}`);
});