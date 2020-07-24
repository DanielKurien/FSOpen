const express = require("express");
const app = express();
const morgan = require("morgan");
const cors = require("cors");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("build"));

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Anthony Towns",
    number: "07-3483-23",
    id: 2,
  },
  {
    name: "Dan Ambramov",
    number: "7327-3283",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "043-1248",
    id: 4,
  },
];

app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  let body = req.body;
  if (!body.name || !body.number) {
    return res.status(404).json({
      error: "name or phone number missing",
    });
  }

  const duplicate = persons.find((person) => person.name === body.name);

  if (duplicate !== undefined) {
    return res.status(404).json({
      error: "name already exists",
    });
  } else {
    const person = {
      name: body.name,
      number: body.number,
      id: Math.round(Math.random() * 1000),
    };

    persons = persons.concat(persons);
    res.json(person);
  }
});

app.get("/info", (req, res) => {
  res.send(
    `<p>Phonebook has info for ${persons.length} people</p> ${new Date()}`
  );
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

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
