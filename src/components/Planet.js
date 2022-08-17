import React, { useContext } from 'react';
import ContextAPI from '../context/ContextAPI';

function Planet() {
  const { planets } = useContext(ContextAPI);
  console.log(planets);

  return (
    <div>
      {
        (planets.length <= 0) ? <h1>Carregando...</h1>
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
