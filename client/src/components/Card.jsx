import React from 'react'

const Card = ({card}) => {
    const { text, comments, createdAt } = card;
    console.log(card)
  return (
    <div>
        {text}
        {createdAt}
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
