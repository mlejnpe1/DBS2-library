import React from 'react'

function CardItem(props) {

    return (
        <>
        <a href="">
            <div className="cards-item-wrap">
                <img className="cards-item-image" alt="book cover" src={props.cover}/>
                <div className="cards-item-info">
                    <h3 className="cards-item-Title">{props.title}</h3>
                    <h4 className="cards-item-author" style={{"height" : "50px"}}>{props.author}</h4>
                </div>
            </div>
        </a> 
        </>
    )
}

export default CardItem
