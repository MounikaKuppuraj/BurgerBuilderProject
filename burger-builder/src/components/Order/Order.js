import React from 'react'
import classes from './Order.module.css';
const order = (props) => {
    let ingredients=[];
    for (const key in props.ingredients) {
        ingredients.push({
            name:key,
            quantity:props.ingredients[key]
        })
    }
    const style={
        textTransform:'capitalize',
        display:'inline-block',
        margin:'0 8px',
        border:'1px solid #ccc',
        padding:'5px'
    }
   const displayIngredients=ingredients.map(ingredient=>{
   return <span key={ingredient.name} style={style}>{ingredient.name} : ({ingredient.quantity})</span>
   })
    return (
        <div className={classes.Order}>
            <p>Ingredients:{displayIngredients}</p>
            <p>Price:<strong>USD {props.price}</strong></p>
        </div>
    )
}

export default order;
