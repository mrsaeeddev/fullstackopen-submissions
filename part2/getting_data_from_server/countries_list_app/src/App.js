import React, { useState, useEffect } from "react";
import Axios from "axios";

const Filter = ({persons,setPersons,setCity,setSearch}) => {
  const handleSearch = ev => {
    let search = ev.target.value.trim().toLowerCase();
    setSearch(search);
    let searchedpersons = persons.filter((asset) => asset.name.toLowerCase().indexOf(ev.target.value) !== -1);
    if(searchedpersons.length === 1) {
      const Api_Key = '8d2de98e089f1c28e1a22fc19a24ef04';
      Axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchedpersons[0].capital}&appid=${Api_Key}&units=metric`).then(resp => {
        console.log(resp.data)
        setCity(resp.data)
      })
    }
};
  return (
    <input onChange={handleSearch} />
  )
}

const Persons = ({ persons, setPersons,detail,setDetail,search }) => {

  const handleCountries = (v,i) => {
    console.log(v,i)
    let detail = { show : true, index : i };
    setDetail(detail);

  }

  const filtered_Countries = persons.filter((person) => { 
    return person.name.trim().toLowerCase().match(search)
  });
 
  return (
    <div>{search.length > 0 ?
      filtered_Countries.length === 1 ? 
      filtered_Countries.map((v, i) => {
        return <div key={i}><h2>{v.name}</h2><div>
       <div>capital : {v.capital}</div><div>population : {v.population}</div>
       <h2>languages :</h2>
       <ul>{v.languages.map((v,i)=> <li key={i}>{v.name}</li> )}</ul>
      {v.flag && <img width="160px" height="100px" alt="country flag" src={v.flag}/>}</div>
       </div>;
       }) 
      :
      filtered_Countries.length < 10 ? filtered_Countries.map((v,i) => <div key={i}>{v.name}{detail.show && (detail.index==i) && <div>{v.capital}</div>}<button onClick={() => handleCountries(v,i)}>Show</button></div>) : 
      <div>Too many filters, specify another filter</div>
      :
      persons.map((v, i) => {
       return <div key={i}>{v.name}</div>;
      })
    }</div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [city, setCity] = useState([]);
  const [detail,setDetail] = useState(false);
  const [search, setSearch] = useState("");

  const hook = () => {
    Axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setPersons(response.data)
      })
  }

  useEffect(hook, [])

  return (
    <div>
      <h2>find countries</h2>
      <div>
        filter shown with <Filter persons={persons} setSearch={setSearch} setPersons={setPersons} setCity={setCity} />
      </div>
      <div>
      <Persons persons={persons} setPersons={setPersons} search={search} detail={detail} setDetail={setDetail}/>
      {(city && city.name && search.length > 3) ? <div><h2>weather in {city.name}</h2><div>temperature : {city.main.temp} C </div><div>wind : {city.wind.speed} kph</div></div>:null}
      </div>
    </div>
  );
};

export default App;
