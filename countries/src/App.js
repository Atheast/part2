import React, {useState,useEffect} from 'react';
import axios from 'axios';

const App = () => {
  const [countries, newCountries] = useState([]);
  const [search, newSearch] = useState(''); 
  const [show, newShow] = useState({});

  const handleSearch = (e) => newSearch(e.target.value);

  useEffect(() => {
    if(search !== '') {
      axios
      .get(`https://restcountries.eu/rest/v2/name/${search}`)
      .then(response => {
        newShow({});
        newCountries(response.data);
      })
      .catch(err => console.log(err));
    }
  },[search]);

  return (
    <div>
      find countries <input value={search} onChange={handleSearch}/>
      <Countries countries={countries} show={show} newShow={newShow}/>
    </div>
  )
}

const Countries = ({countries,show,newShow}) => {
  if(Object.keys(show).length !== 0) {
    return (
      <div>
        <Country country={show}/>
      </div>
    )
  }
  else if (countries.length === 0){
    return(
      <div>
        <p>Not found any matches</p>
      </div>
    )
  }
  else if(countries.length === 1) {
    return (
      <div>
        <Country country={countries[0]}/>
      </div>
    )
  } else if (countries.length >10) {
    return(
      <div>
        <p>Too many matches</p>
      </div>
    )
  } else {
    return(
      <div>
        {countries.map(country => (
          <p key={country.name}>
            {country.name} <button onClick={() => newShow(country)}> Show </button>
          </p>
        ))}
      </div>
    )
  }
}

const Country = ({country}) => {
  const [weather, newWeather] = useState({});
  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`)
      .then(response => {
        newWeather(response.data.current);
      })
      .catch(err => console.log(err));

      return () => {

    }
  },[country.capital]);
  return(
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map(x => <li key={x.name}>{x.name}</li>)}
      </ul>
      <img src={country.flag} alt="flag" style={{width: 300}}/>
      <h3>Weather in {country.capital}</h3>
      <p><b>temperature</b> {weather.temperature}</p>
      <img src={weather.weather_icons} alt="weather_icon"/>
      <p><b>wind</b> {weather.wind_speed} mph direction {weather.wind_dir}</p>
    </div>
  )
}

export default App;
