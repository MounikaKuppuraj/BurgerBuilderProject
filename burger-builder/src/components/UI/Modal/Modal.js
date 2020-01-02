import React,{Component} from 'react';
import classes from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
class Modal extends Component {
    shouldComponentUpdate(nextProps,nextState){
        return nextProps.show!==this.props.show
    }  
    render(){
        let modalClasses=[classes.Modal,classes.Close];
        if(this.props.show){
            modalClasses=[classes.Modal,classes.Open];
        }
        return (
            <Auxillary>
            <Backdrop show={this.props.show} clicked={this.props.purchaseCancel}/>
            <div className={modalClasses.join(' ')}>
                {this.props.children}
            </div>
            </Auxillary>
        )
    }
    
}

export default Modal;
