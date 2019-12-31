import React from 'react'
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';
const burger=(props)=>{
    let transformIngredients=Object.keys(props.ingredients).map(ingredient=>{
        return [...Array(props.ingredients[ingredient])].map((_,i)=>{
            return <BurgerIngredient key={ingredient+i} type={ingredient}/>
        })
    })
    .reduce((acc,cur)=>acc.concat(cur),[])
    if(transformIngredients.length===0){
        transformIngredients=<p>Please start adding ingredients!</p>
    }
        return (
            <div className={classes.Burger}>
                <BurgerIngredient type="bread-top"/>
                {transformIngredients}
                <BurgerIngredient type="bread-bottom"/>
            </div>
        )
}
export default burger;
