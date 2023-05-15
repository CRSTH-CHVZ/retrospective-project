import React, {useEffect, useState} from 'react'
import Card from "./Card.jsx";
import {Col} from "react-bootstrap";
import CardForm from "./CardForm.jsx";

const Columns = ({el}) => {
    const { title, cards, color, _id } = el;
    const [arrCard, setArrCard] = useState(cards);
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
              arrCard?.length >= 1 ?
                  arrCard.map( (card) => {
                      console.log(card)
                      return (
                          <Card
                              card={ card }
                              arrCard={ arrCard }
                              setArrCard={ setArrCard }
                          />
                      )
                  }) :
                  <i>Esto está vacío. Agrega una tarjeta</i>
          }
          <CardForm
              _id={_id}
              cards={
                  cards
              }
              arrCard={ arrCard }
              setArrCard={ setArrCard }
          />
      </Col>
  )
}

export default Columns
