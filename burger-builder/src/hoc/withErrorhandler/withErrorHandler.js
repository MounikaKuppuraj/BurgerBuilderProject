import React, { Component } from 'react'
import Auxillary from '../Auxillary/Auxillary';
import Modal from '../../components/UI/Modal/Modal';
const withErrorHandler = (WrapperComponent,axios) => {
    return class extends Component{
        state={
            error:null,
        }
        componentWillMount(){
            axios.interceptors.response.use(response=>response,error=>{
                this.setState({error:error})
            })
        }
        errorcloseHandler=()=>{
            this.setState({error:null})
        }
        render(){
            return (
            <Auxillary>
                {this.state.error ? 
                <Modal show={this.state.error} purchaseCancel={this.errorcloseHandler}>
                    {this.state.error ? this.state.error.message : null}
                </Modal> : null}
            <WrapperComponent {...this.props}/>
            </Auxillary>
            );
        }
    }
   
}

export default withErrorHandler;
