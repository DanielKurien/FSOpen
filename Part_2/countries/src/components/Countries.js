import React from "react";
import Weather from "./Weather";
const Countries = ({ filteredCountries }) => {
  if (filteredCountries.length === 1) {
    const country = filteredCountries[0];
    return (
      <>
        <h1>{country.name}</h1>
        <p>
          <strong>Capital:</strong> {country.capital}
        </p>
        <p>
          <strong>Population:</strong> {country.population} people
        </p>
        <h3>Spoken Languages</h3>
        <ul>
          {country.languages.map((language) => (
            <li key={language.name}>{language.name}</li>
          ))}
        </ul>

        <img width="200" src={country.flag} alt={`${country.name}'s Flag`} />
        <Weather capital={country.capital} />
      </>
    );
  } else if (filteredCountries.length < 10) {
    return (
      <div>
        {filteredCountries.map((country) => (
          <p key={country.name}>{country.name}</p>
        ))}
      </div>
    );
  }
  return <p>Too many matches, specify another filter</p>;
};
export default Countries;
