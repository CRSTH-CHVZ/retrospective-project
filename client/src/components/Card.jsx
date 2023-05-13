import React from 'react'
import {Button, Card as Tarjeta} from 'react-bootstrap';
import deleteCard from "../services/deleteCard.js";

const Card = ({card}) => {
    const { text, comments, createdAt, _id } = card;
    console.log('card', card)
    const deleteC = async () => {
        await deleteCard(_id);
    }
    function transform(createdAt){
        const date = new Date(createdAt);
        const year = date.getFullYear();
        const month = date.getMonth();
        const day = date.getDay();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        return `${day}/${month}/${year}-${hours}:${minutes}`
    }
  return (
    <div>
        {createdAt}
        <Tarjeta>
            <Tarjeta.Body>
                <Tarjeta.Title>
                    {text}
                </Tarjeta.Title>
                <Tarjeta.Text>
                    {transform(createdAt)}
                </Tarjeta.Text>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={ () => { deleteC() } }
                >
                    Eliminar</Button>
            </Tarjeta.Body>
        </Tarjeta>
        {
            comments?.length >= 1 ?
                card.comments.map( (comment) => {
                    const { text, createdAt } = comment;
                    return(
                        <>
                            <p>{text}</p>
                            <p>{createdAt}</p>
                        </>
                    )
                }) : null
        }
    </div>
  )
}

export default Card
