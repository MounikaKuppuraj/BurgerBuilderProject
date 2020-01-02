import React from 'react';
import classes from './Button.module.css';
const button = (props) => {
    const btnClass=[classes.Button,classes[props.btnStyle]]
    return(
    <button onClick={props.clicked} className={btnClass.join(' ')}>{props.children}</button>
)}

export default button;
