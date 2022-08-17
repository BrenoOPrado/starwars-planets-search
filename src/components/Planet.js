import React, { useContext } from 'react';
import ContextAPI from '../context/ContextAPI';

function Planet() {
  const { planets, textFilter, setTextFilter } = useContext(ContextAPI);

  const nameFilterChange = ({ target }) => {
    setTextFilter({
      ...textFilter,
      filterByName: {
        name: target.value,
      },
    });
  };

  return (
    <div>
      <input
        type="text"
        value={ textFilter.filterByName.name }
        onChange={ (e) => nameFilterChange(e) }
        data-testid="name-filter"
        className="name-filter"
      />
      {
        (planets.length <= 0) ? <h3>Não existem planetas assim</h3>
          : (
            <table>
              <thead>
                <tr>
                  {
                    Object.keys(planets[0]).map((item) => (<th key={ item }>{item}</th>))
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
