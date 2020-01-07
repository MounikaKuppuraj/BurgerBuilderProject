import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/Spinner/Spinner';
import {withRouter} from 'react-router-dom';
class ContactData extends Component {
    state={
        name:'',
        email:'',
        address:{
            street:'',
            postalCode:''
        },
        loading:false
    }
    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({loading:true})
        const order={
            ingredients:this.props.ingredients,
            totalPrice:this.props.totalPrice,
            customer:{
                name:'Mounika',
                address:{
                    street:'TestStreet',
                    zipcode:600119,
                    country:'India'
                },
                email:'mounikakuppuraj@gmail.com'
            },
            delivery:'fastest'
        }
        axios.post('/orders.json',order)
        .then(response=>{
            this.setState({loading:false})
            this.props.history.replace('/');
        })
        .catch(error=>{
            this.setState({loading:false})
        })
    }
    render() {
        let form=(
            <form>
                    <input className={classes.Input} 
                    type="text" name="name" 
                    placeholder="Your Name"
                    />
                    <input className={classes.Input} 
                    type="email" name="email" 
                    placeholder="Your MailId"
                    />
                    <input className={classes.Input} 
                    type="text" name="street" 
                    placeholder="Street"
                    />
                    <input className={classes.Input} 
                    type="text" name="postalCode" 
                    placeholder="Postal Code"/>
                    <Button btnStyle="Success" clicked={this.orderHandler}>ORDER</Button>
                </form>
        );
        if(this.state.loading){
            form=<Spinner/>
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter Your Contact Details</h4>
                {form}
            </div>
        )
    }
}
export default withRouter(ContactData);
