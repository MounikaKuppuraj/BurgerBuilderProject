import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';
const controls=[
    {label:'Meat',type:'meat',price:5},
    {label:'Bacon',type:'bacon',price:1.5},
    {label:'Cheese',type:'cheese',price:3.5},
    {label:'Salad',type:'salad',price:0.5},
]
const buildControls = (props) => {
    return (
        <div className={classes.BuildControls}>
        <p>Current Price : <strong>${props.price.toFixed(2)}</strong></p>
            {
                controls.map(control=><BuildControl 
                    key={control.type} 
                    type={control.type}
                    label={control.label}
                    addIngredient={props.addIngredient}
                    removeIngredient={props.removeIngredient}
                    disabled={props.disabled[control.type]}/>)
            }
        </div>
    )
}

export default buildControls;
