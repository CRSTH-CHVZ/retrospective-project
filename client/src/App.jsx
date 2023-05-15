import React, { useState, useEffect } from 'react'
import getCols from "./services/getCols.js";
import {Col, Container, Row} from "react-bootstrap";
import Columns from "./components/Columns.jsx";


function App() {
    const [cols, setCols] = useState([]);
    async function retrieveCols(){
        await getCols()
            .then( (response) => {
                return setCols(response);
            })
    }
    useEffect( () => {
        retrieveCols();
    }, []);
  return (
      <>
          <Container>
              <Row>
                  <h1>Retrospective Project</h1>
              </Row>
              <Row>
                  {
                      cols.map( (el) => {
                          return (
                              <Col>
                                  <Columns
                                      el={el}
                                  />
                              </Col>
                          )
                      })
                  }
              </Row>
          </Container>
      </>
  )
}

export default App
