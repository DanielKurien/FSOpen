const express = require("express");
const app = express();
const morgan = require("morgan");

app.use(express.json());
app.use(morgan("tiny"));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "5869445645",
    id: 2,
  },
  {
    name: "Dan Ambramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendick",
    number: "39-23-64231122",
    id: 4,
  },
];

app.get("/api/persons", (req, res) => {
  res.send(persons);
});

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has ${persons.length} people</p> ${new Date()}`);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.post("/api/persons", (req, res) => {
  const body = req.body;
  const duplicate = persons.find((person) => person.name === body.name);
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "content missing",
    });
  } else if (duplicate !== undefined) {
    return res.status(400).json({
      error: "name already exists",
    });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 100 + 1),
  };

  persons = persons.concat(person);

  res.json(person);
});
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});
const PORT = process.env.port || 3001;
app.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT}`);
});
