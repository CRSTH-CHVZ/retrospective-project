import React, {useEffect, useState} from 'react'
import {Button, Form} from "react-bootstrap";
import postCard from "../services/postCard.js";

const CardForm = ({_id}) => {
    const [bodyCard, setBodyCard] = useState("");
    const handleChange = async () => {
        return setBodyCard(event.target.value);
    }
    const handleSubmit = async () => {
        if( bodyCard.length === 0){
           return;
        }
        await postCard(bodyCard, _id)
        return setBodyCard("");
    }
  return (
      <div
          style={{
              marginTop: "30px",
              backgroundColor: "#ededed",
              borderRadius: "15px",
              padding: "10px",
          }}
      >
          <Form>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Agrega una tarjeta</Form.Label>
                  <Form.Control
                      type="text"
                      placeholder="Escribe aquí"
                      onChange={ (event) => { handleChange(event) } }
                      value={ bodyCard }
                  />
              </Form.Group>
              <Button
                  onClick={ () => { handleSubmit() } }
              >
                  Agregar
              </Button>
          </Form>
      </div>
  )
}

export default CardForm
