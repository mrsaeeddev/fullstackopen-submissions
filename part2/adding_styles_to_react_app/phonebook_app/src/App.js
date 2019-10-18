import React, { useState, useEffect } from "react";
import personService from './services/services';

const Notification = ({ successMessage, errorMessage }) => {
  if (successMessage === null && errorMessage === null) {
    return null
  }
  else if (errorMessage === null && successMessage) {
    return <div className="success">{successMessage}</div>;
  }
  else if (errorMessage && successMessage === null) {
    return <div className="error">{errorMessage}</div>
  }
  else {
    return null
  }
}

const Filter = ({ setSearch, search }) => {
  const handleSearch = ev => {
    search = ev.target.value.trim().toLowerCase();
    setSearch(search)
  };
  return (
    <input onChange={handleSearch} value={search} />
  )
}

const PersonForm = ({ persons, setperson, setSuccessMessage }) => {
  const [newName, setNewName] = useState({ name: "", number: "" });
  const handleForm = ev => {
    console.log(ev)
    ev.preventDefault();
    let id;
    let updated_persons;
    if (persons.some(person => person.name === newName.name)) {
      if (window.confirm(`${newName.name} is already added to phonebook. Replace the old number with a new one?`)) {
        updated_persons = persons.filter((person) => {
          if (person.name === newName.name) {
            person.number = newName.number;
            id = person.id
          }
          return person;
        })
        personService.update(id, newName)
        setperson(updated_persons)
        setSuccessMessage(`Number of ${newName.name} has been updated`)
        setTimeout(() => { setSuccessMessage(null) }, 5000)
        let emptyName = {
          name: "",
          number: ""
        };
        setNewName(emptyName);
      }
    } else {
      personService.create(newName)
      persons = persons.concat(newName);
      setperson(persons);
      setSuccessMessage(`Added ${newName.name} successfully to the list`)
      setTimeout(() => { setSuccessMessage(null) }, 5000)

      let emptyName = {
        name: "",
        number: ""
      };
      setNewName(emptyName);
    }
  };



  const handleInputName = ev => {
    let updatedName = {
      name: ev.target.value
    };
    setNewName(updatedName);
  };

  const handleInputNumber = ev => {
    let updatedName = {
      ...newName,
      number: ev.target.value,
      id: Math.floor((Math.random() * 1000) + 1)
    };
    setNewName(updatedName);
  };
  return (
    <form onSubmit={handleForm}>
      <div>
        name:{" "}
        <input onChange={handleInputName} value={newName.name} name="name" />
        <br />
        number:{" "}
        <input
          onChange={handleInputNumber}
          value={newName.number}
          name="number"
        />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = ({ persons, search, setperson, setErrorMessage }) => {
  const deleteperson = (id, name) => {
    if (window.confirm('Are you sure to delete this person?')) {
      personService.deleteperson(id).then(() => {
        persons = persons.filter((person) => person.id !== id)
        setperson(persons);
        setErrorMessage(`${name} has been deleted from server`)
        setTimeout(() => { setErrorMessage(null) }, 5000)
      })
        .catch(() => {
          setErrorMessage(`Information of ${name} has already been deleted from server`)
          setTimeout(() => { setErrorMessage(null) }, 5000)
        })
    }
    else {
      return null
    }
  }
  return (
    <div>{search.length > 0 ?
      persons.filter(person => { return person.name.toLowerCase().match(search) }).map((v, i) => {
        return <div key={i}>{v.name} {v.number}<button onClick={() => deleteperson(v.id, v.name)}>delete</button></div>
      }) : persons.map((v, i) => {
        return <div key={i}>{v.name} {v.number}<button onClick={() => deleteperson(v.id, v.name)}>delete</button></div>
      })
    }</div>
  )
}

const App = () => {
  const [persons, setperson] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [search, setSearch] = useState("");

  const hook = () => {
    personService.getAll().then(response => {
      setperson(response.data)
    })
  }

  useEffect(hook, [])

  return (
    <div>
      <Notification successMessage={successMessage} errorMessage={errorMessage} />
      <h2>phonebook</h2>
      <div>
        filter shown with <Filter search={search} setSearch={setSearch} />
      </div>
      <h2>add a new</h2>
      <PersonForm persons={persons} setperson={setperson} setSuccessMessage={setSuccessMessage} />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} setperson={setperson} setErrorMessage={setErrorMessage} />
    </div>
  );
};

export default App;