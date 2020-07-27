require("dotenv").config();
const express = require("express");
const app = express();
const Person = require("./models/person");
const morgan = require("morgan");
const cors = require("cors");

app.use(express.json());
app.use(morgan("tiny"));
app.use(cors());
app.use(express.static("build"));

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => res.json(persons));
});

app.post("/api/persons", (req, res, next) => {
  let body = req.body;
  if (!body.name || !body.number) {
    return res.status(404).json({
      error: "name or phone number missing",
    });
  } else {
    const person = new Person({
      name: body.name,
      number: body.number,
    });
    person
      .save()
      .then((savedPerson) => res.json(savedPerson))
      .catch((error) => next(error));
  }
});

app.get("/info", (req, res) => {
  Person.find({}).then((people) =>
    res.send(
      `<p>Phonebook has info for ${people.length} ${
        people.length > 1 ? "people" : "person"
      }</p> ${new Date()}`
    )
  );
});

app.get("/api/persons/:id", (req, res, next) => {
  Person.findById(req.params.id)
    .then((person) => {
      if (person) {
        res.json(person);
      } else {
        res.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((returnedPerson) => response.json(returnedPerson.toJSON()))
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then((result) => {
      res.status(204).end();
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  if (error.name === "CastError") {
    return response.status(404).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response
      .status(404)
      .send(
        "Validaton Error: Name must be at least 3 characters, and number should be at least 8 characters"
      );
  } else if (error.name === "MongoError") {
    return response.status(404).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
