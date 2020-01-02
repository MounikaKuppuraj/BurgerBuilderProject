import React,{Component} from 'react';
import classes from './Layout.module.css';
import Auxillary from '../Auxillary/Auxillary';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    state={
        showSideDrawer:false
    }
    sideDrawerOpenHandler=()=>{
        this.setState({showSideDrawer:true})
    }
    sideDrawerCancelHandler=()=>{
        this.setState({showSideDrawer:false})
    }
    render(){
        return(
            <Auxillary>
            <Toolbar openSideDrawer={this.sideDrawerOpenHandler}/>
            <SideDrawer 
            show={this.state.showSideDrawer} 
            closeSideDrawer={this.sideDrawerCancelHandler}/>
            <div className={classes.Content}>
                {this.props.children}
            </div>
        </Auxillary>
        )
    }
}
        
export default Layout;
