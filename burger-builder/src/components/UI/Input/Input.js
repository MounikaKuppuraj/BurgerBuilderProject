import React from 'react'
import classes from './Input.module.css';
const input = (props) => {
    let inputElement=null;
    let formClasses=[classes.InputElement]
    if(props.invalid && props.shouldValidate && props.touched){
        formClasses.push(classes.Invalid)
    }
    switch(props.elementType){
        case 'input':
            inputElement= <input 
            className={formClasses.join(' ')} 
            {...props.elementConfig} 
            value={props.value}
            onChange={props.changeHandler}/>;
            break;
        case 'select':
            inputElement=(<select className={formClasses.join(' ')} onChange={props.changeHandler} value={props.value}>
                            {props.elementConfig.options.map(optionval=>{
                            return (
                            <option value={optionval.value} key={optionval.value}>
                                {optionval.displayValue}
                            </option>);
                            })}
                        </select>);
            break;
        default:
            inputElement=null;
    }
    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
        </div>
    )
}

export default input;
