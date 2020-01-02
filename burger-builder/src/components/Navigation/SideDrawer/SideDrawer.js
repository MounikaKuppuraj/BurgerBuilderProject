import React from 'react'
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
const sideDrawer = (props) => {
    let sidedrawClasses=[classes.SideDrawer,classes.Close];
    if(props.show){
        sidedrawClasses=[classes.SideDrawer,classes.Open];
    }
    return (
        <Auxillary>
            <Backdrop show={props.show} clicked={props.closeSideDrawer}/>
        <div className={sidedrawClasses.join(' ')}>
            <div className={classes.Logo}>
                <Logo/>
            </div>
            <NavigationItems/>
        </div>
        </Auxillary>
    )
}

export default sideDrawer;
