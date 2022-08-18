import React, { useContext } from 'react';
import ContextAPI from '../context/ContextAPI';

function Planet() {
  const {
    planets,
    textFilter,
    setTextFilter,
    setNumericFilter,
    numericFilter,
    numericHelper,
    setNumericHelper,
    numericOptions,
    setNumericOptions,
  } = useContext(ContextAPI);

  const nameFilterChange = ({ target }) => {
    setTextFilter({
      ...textFilter,
      filterByName: {
        name: target.value,
      },
    });
  };

  const numericInputChange = ({ target }) => {
    setNumericHelper({
      ...numericHelper,
      [target.name]: target.value,
    });
  };

  const filterClick = () => {
    setNumericFilter({
      ...numericFilter,
      filterByNumericValues: [
        ...numericFilter.filterByNumericValues, numericHelper,
      ],
    });
    setNumericOptions(numericOptions.filter((item) => item !== numericHelper.column));
  };

  const removeFilter = (obj) => {
    setNumericFilter({
      ...numericFilter,
      filterByNumericValues: numericFilter.filterByNumericValues.filter((item) => (
        item !== obj)),
    });
    setNumericOptions([obj.column, ...numericOptions]);
  };

  return (
    <div>
      <form>
        <label htmlFor="column">
          Coluna:
          <select
            name="column"
            id="column"
            value={ numericHelper.column }
            onChange={ (e) => numericInputChange(e) }
            data-testid="column-filter"
          >
            {
              numericOptions.map((item) => (
                <option
                  value={ item }
                  key={ item }
                  name="column"
                  id="column"
                >
                  {item}
                </option>
              ))
            }
          </select>
        </label>
        <label htmlFor="comparison">
          Comparação:
          <select
            name="comparison"
            id="comparison"
            value={ numericHelper.comparison }
            onChange={ (e) => numericInputChange(e) }
            data-testid="comparison-filter"
          >
            <option
              value="maior que"
              name="comparison"
              id="comparison"
            >
              maior que
            </option>
            <option
              value="menor que"
              name="comparison"
              id="comparison"
            >
              menor que
            </option>
            <option
              value="igual a"
              name="comparison"
              id="comparison"
            >
              igual a
            </option>
          </select>
        </label>
        <label htmlFor="value">
          Valor numérico:
          <input
            type="number"
            name="value"
            className="value-filter"
            value={ numericHelper.value }
            onChange={ (e) => numericInputChange(e) }
            data-testid="value-filter"
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => filterClick() }
          disabled={ (numericOptions.length <= 0) }
        >
          Filtrar
        </button>
        <input
          type="text"
          value={ textFilter.filterByName.name }
          onChange={ (e) => nameFilterChange(e) }
          name="name-filter"
          data-testid="name-filter"
          className="name-filter"
        />
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => {
            setNumericFilter({ filterByNumericValues: [] });
            setNumericOptions([
              'population', 'diameter', 'orbital_period',
              'rotation_period', 'surface_water',
            ]);
          } }
        >
          Remover filtros
        </button>
      </form>
      <ul>
        {
          numericFilter.filterByNumericValues.map((filter, index) => (
            <li key={ index } data-testid="filter">
              {`${filter.column} ${filter.comparison} ${filter.value}`}
              <button
                type="button"
                onClick={ () => removeFilter(filter) }
              >
                Deletar
              </button>
            </li>
          ))
        }
      </ul>
      {
        (planets.length <= 0) ? <h3>Não existem planetas assim</h3>
          : (
            <table>
              <thead>
                <tr>
                  {
                    Object.keys(planets[0]).map((item) => (
                      <th id={ item } key={ item }>{item}</th>
                    ))
                  }
                </tr>
              </thead>
              <tbody>
                {
                  planets.map((item, index) => (
                    <tr key={ index }>
                      {
                        Object.values(item).map(
                          (value, index2) => (<td key={ index2 }>{value}</td>),
                        )
                      }
                    </tr>
                  ))
                }
              </tbody>
            </table>
          )
      }
    </div>
  );
}

export default Planet;
