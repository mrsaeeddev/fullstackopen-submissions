import React, { useState } from "react";

const Filter = ({setSearch,search}) => {
  const handleSearch = ev => {
    search = ev.target.value.trim().toLowerCase();
    setSearch(search)
};
  return (
    <input onChange={handleSearch}  value={search} />
  )
}

const PersonForm = ({persons, setPersons}) => {
  const [newName, setNewName] = useState({name:"",number:""});
  const handleForm = ev => {
    ev.preventDefault();

    if (persons.some(person => person.name === newName.name)) {
      alert(`${newName.name} is already added to phonebook`);
    } else {
      persons = persons.concat(newName);
      setPersons(persons);
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
    <div>{search.length > 0 ? 
      persons.filter(person => {return person.name.toLowerCase().match(search)}).map((v, i) => {
    return <div key={i}>{v.name} {v.number}</div> }): persons.map((v, i) => {
      return <div key={i}>{v.name} {v.number}</div> })
    }</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

  const [search, setSearch] = useState("");

  return (
    <div>
      <h2>phonebook</h2>
      <div>
        filter shown with <Filter search={search} setSearch={setSearch}  />
      </div>
      <h2>add a new</h2>
      <PersonForm persons={persons} setPersons={setPersons} />
      <h2>Numbers</h2>
      <Persons persons={persons} search={search} setPersons={setPersons} />
    </div>
  );
};

export default App;
