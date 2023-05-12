import React from 'react'
import Card from "./Card.jsx";
import {Col} from "react-bootstrap";

const Columns = ({el}) => {
    const { title, cards, color } = el;
  return (
      <Col
          style={{
              backgroundColor: `${color}`,
              height: "800px",
              padding: "20px",
              borderRadius: "10px"
          }}
      >
          <h6>
              {title}
          </h6>

          {
              cards?.length >= 1 ?
                  cards.map( (card) => {
                      return (
                          <Card
                              card={ card }
                          />
                      )
                  }) :
                  <i>Esto está vacío. Agrega una tarjeta</i>
          }
          {/*Agregar tarjeta*/}
      </Col>
  )
}

export default Columns
