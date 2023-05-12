import React from 'react'

const Card = ({card}) => {
    console.log(card)
  return (
    <div>
        {card.text}
        {
            card?.comments?.length >= 1 ?
                card.comments.map( (comment) => {
                    return(
                        <>
                            {
                                comment.text
                            }
                        </>
                    )
                }) : null
        }
    </div>
  )
}

export default Card
