import React, { useState, useEffect } from 'react'
import './App.css'
import getCols from "./services/getCols.js";

function App() {
    const [cols, setCols] = useState([]);
    async function retrieveCols(){
        await getCols()
            .then( (response) => {
                return setCols(response);s
            })
    }
    useEffect(() => {
        retrieveCols();
    }, []);
    useEffect(() => {
        console.log(cols)
    }, [cols]);


  return (
      <>
        <div>Mi tablero se muestra aquí</div>
          {
              cols.map( (el) => {
                  return(
                      <>
                          {el.title}
                      </>
                  )
              })
          }
      </>
  )
}

export default App
