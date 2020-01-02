import React from 'react';
import BuildControl from './BuildControl/BuildControl';
import classes from './BuildControls.module.css';
const controls=[
    {label:'Meat',type:'meat'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Salad',type:'salad'},
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
            <button className={classes.OrderButton} 
            disabled={props.purchaseable}
            onClick={props.purchasing}>ORDER NOW</button>
        </div>
    )
}

export default buildControls;
