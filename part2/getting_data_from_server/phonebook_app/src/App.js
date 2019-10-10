import React, { useState, useEffect } from "react";
import Axios from "axios";

const Filter = ({setSearch}) => {
  const handleSearch = ev => {
    let search = ev.target.value.trim().toLowerCase();
    setSearch(search);
};
  return (
    <input onChange={handleSearch} />
  )
}

const PersonForm = ({persons, setPersons}) => {
  const [newName, setNewName] = useState("");
  const handleForm = ev => {
    ev.preventDefault();

    if (persons.some(person => person.name === newName.name)) {
      alert(`${newName.name} is already added to phonebook`);
    } else {
      setPersons(persons.concat(newName));
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
      number: ev.target.value
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


const Persons = ({persons, search}) => {
  return (
    <div>{search.length > 0 ? persons.filter((person) => { 
      return person.name.toLowerCase().match(search)
    }).map((v, i) => {
      return <div key={i}>{v.name} {v.number}</div>;
    }) : persons.map((v, i) => {
      return <div key={i}>{v.name} {v.number}</div>})
    }
      </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [search, setSearch] = useState("");
  const hook = () => {
    Axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>phonebook</h2>
      <div>
        filter shown with <Filter setSearch={setSearch} />
      </div>
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} />
    </div>
  );
};

export default App;
