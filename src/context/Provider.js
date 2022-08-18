import React, { useEffect, useState } from 'react';
import ContextAPI from './ContextAPI';

const Provider = ({ children }) => {
  const [APIResult, setAPIResult] = useState({ results: [] });
  const [planets, setPlanets] = useState([]);
  const [planetFilters, setPlanetFilters] = useState([]);
  const [textFilter, setTextFilter] = useState({
    filterByName: {
      name: '',
    },
  });
  const [numericFilter, setNumericFilter] = useState({
    filterByNumericValues: [],
  });
  const [numericHelper, setNumericHelper] = useState({});
  const [numericOptions, setNumericOptions] = useState([
    'population', 'diameter', 'orbital_period',
    'rotation_period', 'surface_water',
  ]);

  useEffect(() => {
    const apiFetchFunc = async () => {
      await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json())
        .then((result) => setAPIResult(result));
    };
    apiFetchFunc();
    setNumericHelper({
      column: 'population',
      comparison: 'maior que',
      value: '0',
    });
  }, []);

  useEffect(() => {
    const results = APIResult.results.map((item) => ({
      name: item.name,
      diameter: item.diameter,
      gravity: item.gravity,
      population: item.population,
      orbital_period: item.orbital_period,
      rotation_period: item.rotation_period,
      climate: item.climate,
      terrain: item.terrain,
      surface_water: item.surface_water,
      films: item.films,
      created: item.created,
      edited: item.edited,
      url: item.url,
    }));
    setPlanets(results);
    setPlanetFilters(results);
  }, [APIResult]);

  useEffect(() => {
    const results = planets.filter((item) => (
      item.name.toUpperCase().includes(textFilter.filterByName.name.toUpperCase())));
    setPlanetFilters(results);
  }, [textFilter]);

  useEffect(() => {
    console.log(numericFilter);
    setNumericOptions(numericOptions.filter((item) => item !== numericHelper.column));
    numericFilter.filterByNumericValues.forEach((item) => {
      switch (item.comparison) {
      case 'maior que':
        setPlanetFilters(
          planetFilters.filter((planet) => (
            parseFloat(planet[item.column]) > parseFloat(item.value)
          )),
        );
        break;
      case 'menor que':
        setPlanetFilters(
          planetFilters.filter((planet) => (
            parseFloat(planet[item.column]) < parseFloat(item.value)
          )),
        );
        break;
      case 'igual a':
        setPlanetFilters(
          planetFilters.filter((planet) => (
            parseFloat(planet[item.column]) === parseFloat(item.value)
          )),
        );
        break;

      default:
        break;
      }
    });
  }, [numericFilter]);

  useEffect(() => {
    setNumericHelper({
      column: numericOptions[0],
      comparison: 'maior que',
      value: '0',
    });
  }, [numericOptions]);

  return (
    <ContextAPI.Provider
      value={ {
        planets: planetFilters,
        textFilter,
        setTextFilter,
        setNumericFilter,
        numericFilter,
        numericHelper,
        setNumericHelper,
        numericOptions,
      } }
    >
      {children}
    </ContextAPI.Provider>
  );
};

export default Provider;
