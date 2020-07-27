import React, { useState, useEffect } from "react";
import personsService from "./services/persons";
import Notification from "./components/Notification";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    };
    const findPerson = persons.find((person) => person.name === newName);
    if (findPerson !== undefined) {
      const updatePerson = window.confirm(
        `${findPerson.name} already exists, replace the old number with a new one?`
      );
      if (updatePerson) {
        personsService
          .update(findPerson.id, personObject)
          .then((returnedPerson) =>
            setPersons(
              persons.map((person) =>
                person.id !== findPerson.id ? person : returnedPerson
              )
            )
          );
      }
    } else {
      personsService
        .create(personObject)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setSuccessMessage(`${newPerson.name} was added to the server`);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 5000);
        })
        .catch((error) => {
          setErrorMessage(error.response.data.error);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
    setNewName("");
    setNewNumber("");
  };

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().startsWith(filter.toLowerCase())
  );

  const deletePerson = (id) => {
    let person = persons.find((person) => person.id === id);
    let confirm = window.confirm(`Delete ${person.name} ?`);
    if (confirm) {
      personsService
        .remove(id)
        .then((response) =>
          setPersons(persons.filter((person) => person.id !== id))
        )
        .catch((error) => {
          setErrorMessage(`${person.name} was already deleted from the server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification
        errorMessage={errorMessage}
        successMessage={successMessage}
      />
      <div>
        filter shown with <input onChange={handleFilterChange} value={filter} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input onChange={handleNameChange} value={newName} />
        </div>
        <div>
          number: <input onChange={handleNumberChange} value={newNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filteredPersons.map((person) => (
        <p key={person.id}>
          {person.name} {person.number}{" "}
          <button onClick={() => deletePerson(person.id)}>delete</button>
        </p>
      ))}
    </div>
  );
};

export default App;
