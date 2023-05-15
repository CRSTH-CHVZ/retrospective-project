import React, {useEffect, useState} from 'react'
import {Button, Form} from "react-bootstrap";
import editCard from "../services/editCard.js";

const EditCard = ({text, createdAt, setIsEdit, _id, colId, setArrCard, arrCard}) => {
    const [textCard, setTextCard] = useState(text);
    const [disableButton, setDisableButton] = useState(true);
    const handleChange = () => {
        setTextCard(event.target.value);
    }
    const handleSubmit = async () => {
        if(textCard.length === 0){
            return;
        }
        await editCard(_id, textCard, colId)
            .then((response) => {
                setArrCard(
                    arrCard => arrCard.map( card => {
                        if(card._id === response._id){
                            card.text = response.text;
                            card.createdAt = response.createdAt;
                        }
                        return card;
                    })
                )
            })
        setIsEdit(false);
    }
    useEffect(() => {
        if(text !== textCard){
            setDisableButton(false)
        }
        else {
            setDisableButton(true)
        }
    }, [textCard]);
    
  return (
    <>
        <div>
            <Form.Control
                type="text"
                placeholder={textCard}
                style={{marginBottom: "10px", marginTop: "10px"}}
                onChange={ (event) => { handleChange(event) } }
                // value={ bodyCard }
            />
        </div>
        <Button
            size="sm"
            style={{marginRight: "10px"}}
            onClick={ handleSubmit }
            disabled={ disableButton }
        >
            Guardar
        </Button>
    </>
  )
}

export default EditCard
