import React from 'react';
import classes from './Layout.module.css';
import Auxillary from '../../hoc/Auxillary';
const layout = (props) => (
        <Auxillary>
            <div>Toolbar,Sidebar,BackDrop</div>
            <div className={classes.Content}>
                {props.children}
            </div>
        </Auxillary>
    )
export default layout;
