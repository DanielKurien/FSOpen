const express = require("express");
const { response } = require("express");
const app = express();

app.use(express.json());
let persons = [
  {
    name: "Arto Hellas",
    phone: "040-123456",
    id: 1,
  },
  {
    name: "Anthony Towns",
    phone: "07-3483-23",
    id: 2,
  },
  {
    name: "Dan Ambramov",
    phone: "7327-3283",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    phone: "043-1248",
    id: 4,
  },
];
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.post("/api/persons", (req, res) => {
  const body = req.body;

  if (!body.name || !body.phone) {
    return res.status(404).json({
      error: "name or phone number missing",
    });
  }

  const duplicate = persons.find((person) => person.name === body.name);

  if (duplicate) {
    return res.status(404).json({
      error: "name already exists",
    });
  } else {
    const person = {
      name: body.name,
      phone: body.phone,
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

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
