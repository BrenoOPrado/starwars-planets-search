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

  useEffect(() => {
    const apiFetchFunc = async () => {
      await fetch('https://swapi-trybe.herokuapp.com/api/planets/')
        .then((response) => response.json())
        .then((result) => setAPIResult(result));
    };
    apiFetchFunc();
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

  return (
    <ContextAPI.Provider value={ { planets: planetFilters, textFilter, setTextFilter } }>
      {children}
    </ContextAPI.Provider>
  );
};

export default Provider;
