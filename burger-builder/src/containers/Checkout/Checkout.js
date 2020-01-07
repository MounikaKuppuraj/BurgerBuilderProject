import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
class Checkout extends Component {
    state={
        ingredients:null,
        totalPrice:0
    }
    componentDidMount(){
        if(this.props.location.search){
            const query=new URLSearchParams(this.props.location.search);
            const ingredients={}
            for (const [key,value] of query.entries()) {
                if(key!=='price'){
               ingredients[key]=+value
                }
                else{
                    this.setState({totalPrice:+value})
                }
            }
            this.setState({ingredients:ingredients})
        }
    }
    cancelCheckoutHandler=()=>{
        this.props.history.goBack();
    }
    continueCheckoutHandler=()=>{
        this.props.history.replace(this.props.match.url+'/contact-data');
    }
    render() {
        return (
            <div>
                {this.state.ingredients ? <CheckoutSummary 
                ingredients={this.state.ingredients} 
                checkoutCancel={this.cancelCheckoutHandler}
                checkoutContinue={this.continueCheckoutHandler}/> : null}
                <Route path={this.props.match.url+"/contact-data"} render={()=>(
                    <ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice}/>
                )}/>
            </div>
        )
    }
}
export default Checkout;
