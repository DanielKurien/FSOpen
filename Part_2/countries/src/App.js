import React, { useState } from "react";
import axios from "axios";
import Countries from "./components/Countries";
const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useState(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(filter.toLowerCase())
  );
  return (
    <div>
      Find Countries <input onChange={handleFilterChange} value={filter} />
      <Countries filteredCountries={filteredCountries} />
    </div>
  );
};

export default App;
