import React, {useState} from 'react'
import {Button, Card as Tarjeta} from 'react-bootstrap';
import deleteCard from "../services/deleteCard.js";
import EditCard from "./EditCard.jsx";

const Card = ({card, arrCard, setArrCard, colId}) => {
    const { text, comments, createdAt, _id } = card;
    const [isEdit, setIsEdit] = useState(false);
    const deleteC = async () => {
        await deleteCard(_id)
            .then((response) => {
                setArrCard(
                    (arrCard) => arrCard.filter( arrCard => arrCard._id != response?._id)
                )
            })
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
        <Tarjeta
            style={{marginBottom: "15px"}}
        >
            <Tarjeta.Body>
                <Tarjeta.Title>
                    {
                        isEdit ?
                            (
                                <EditCard
                                    text={ text }
                                    createdAt={ createdAt }
                                    setIsEdit={ setIsEdit }
                                    _id={ _id }
                                    colId={ colId }
                                    setArrCard={ setArrCard }
                                    arrCard={ arrCard }
                                />
                            )
                            : text
                    }
                </Tarjeta.Title>
                <Tarjeta.Text>
                    {
                        isEdit ?
                            ""
                            : transform(createdAt)
                    }
                </Tarjeta.Text>
                <Button
                    variant="success"
                    size="sm"
                    style={{marginRight: "10px"}}
                    onClick={ () => { setIsEdit(!isEdit) } }
                >
                    {
                        isEdit ?
                            "Cancelar"
                            : "Editar"
                    }
                </Button>
                <Button
                    variant="danger"
                    size="sm"
                    onClick={ () => { deleteC() } }
                >
                    Eliminar
                </Button>
            </Tarjeta.Body>
        </Tarjeta>
        {/*{*/}
        {/*    comments?.length >= 1 ?*/}
        {/*        card.comments.map( (comment) => {*/}
        {/*            const { text, createdAt } = comment;*/}
        {/*            return(*/}
        {/*                <>*/}
        {/*                    <p>{text}</p>*/}
        {/*                    <p>{createdAt}</p>*/}
        {/*                </>*/}
        {/*            )*/}
        {/*        }) : null*/}
        {/*}*/}
    </div>
  )
}

export default Card
