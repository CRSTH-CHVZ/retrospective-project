import React, { useState, useEffect } from 'react'
import getCols from "./services/getCols.js";
import {Col, Container, Row} from "react-bootstrap";
import Card from "./components/Card.jsx";

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
          <Container>
              <Row>
                  {
                      cols.map( (el) => {
                          return (
                              <Col>
                                  {el.title}
                                  {
                                      el.cards?.length >= 1 ?
                                          el.cards.map( (card) => {
                                              return (
                                                  <Card
                                                      card={ card }
                                                  />
                                              )
                                          }) : null
                                  }
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
