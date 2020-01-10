import React, { Component } from 'react'
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import {Route} from 'react-router-dom';
import ContactData from './ContactData/ContactData';
import {connect} from 'react-redux';
class Checkout extends Component {
    // componentDidMount(){
    //     if(this.props.location.search){
    //         const query=new URLSearchParams(this.props.location.search);
    //         const ingredients={}
    //         for (const [key,value] of query.entries()) {
    //             if(key!=='price'){
    //            ingredients[key]=+value
    //             }
    //             else{
    //                 this.setState({totalPrice:+value})
    //             }
    //         }
    //         this.setState({ingredients:ingredients})
    //     }
    // }
    cancelCheckoutHandler=()=>{
        this.props.history.goBack();
    }
    continueCheckoutHandler=()=>{
        this.props.history.replace(this.props.match.url+'/contact-data');
    }
    render() {
        return (
            <div>
                <CheckoutSummary 
                ingredients={this.props.ingredients} 
                checkoutCancel={this.cancelCheckoutHandler}
                checkoutContinue={this.continueCheckoutHandler}/>
                <Route path={this.props.match.url+"/contact-data"} component={ContactData}/>
            </div>
        )
    }
}
const mapStateToProps=state=>{
    return{
        ingredients:state.ingredients
    }
}
export default connect(mapStateToProps)(Checkout);
