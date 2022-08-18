import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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
  const [controlNumber, setControlNumber] = useState(0);
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
    if (numericFilter.filterByNumericValues.length > 0) {
      const filters = (controlNumber < numericFilter.filterByNumericValues.length)
        ? planetFilters : planets;
      numericFilter.filterByNumericValues.forEach((item) => {
        switch (item.comparison) {
        case 'maior que':
          setPlanetFilters(
            filters.filter((planet) => (
              parseFloat(planet[item.column]) > parseFloat(item.value)
            )),
          );
          break;
        case 'menor que':
          setPlanetFilters(
            filters.filter((planet) => (
              parseFloat(planet[item.column]) < parseFloat(item.value)
            )),
          );
          break;
        case 'igual a':
          setPlanetFilters(
            filters.filter((planet) => (
              parseFloat(planet[item.column]) === parseFloat(item.value)
            )),
          );
          break;

        default:
          break;
        }
      });
    } else {
      setPlanetFilters(planets);
    }
    setControlNumber(numericFilter.filterByNumericValues.length);
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
        setNumericOptions,
      } }
    >
      {children}
    </ContextAPI.Provider>
  );
};

Provider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default Provider;
