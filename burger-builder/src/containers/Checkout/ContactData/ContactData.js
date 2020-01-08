import React, { Component } from 'react'
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/Spinner/Spinner';
import {withRouter} from 'react-router-dom';
import Input from '../../../components/UI/Input/Input';
class ContactData extends Component {
    state={
        orderForm:{
                name:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Name'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                email:{
                    elementType:'input',
                    elementConfig:{
                        type:'email',
                        placeholder:'Your E-Mail'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                street:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Your Street'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                zipcode:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'ZIP Code'
                    },
                    value:'',
                    validation:{
                        required:true,
                        minLength:5
                    },
                    valid:false,
                    touched:false
                },
                country:{
                    elementType:'input',
                    elementConfig:{
                        type:'text',
                        placeholder:'Country'
                    },
                    value:'',
                    validation:{
                        required:true
                    },
                    valid:false,
                    touched:false
                },
                delivery:{
                    elementType:'select',
                    elementConfig:{
                        options:[
                            {value:'fastest',displayValue:'Fastest'},
                            {value:'cheapest',displayValue:'Cheapest'}
                        ]
                    },
                    value:'fastest',
                    validation:{},
                    valid:true,
                }
        },
        loading:false,
        formIsValid:false
    }

    orderHandler=(event)=>{
        event.preventDefault();
        this.setState({loading:true});
        const formData={}
        for (const key in this.state.orderForm) {
            formData[key]=this.state.orderForm[key].value
        }
        const order={
            ingredients:this.props.ingredients,
            totalPrice:this.props.totalPrice,
            orderData:formData
        }
        axios.post('/orders.json',order)
        .then(response=>{
            this.setState({loading:false})
            this.props.history.replace('/orders');
        })
        .catch(error=>{
            this.setState({loading:false})
        })
    }
    checkValidity=(value,rules)=>{
        
        let isValid=true;
        if(rules.required){
            isValid=value.trim()!=='' && isValid
        }
        if(rules.minLength){
            isValid=value.length>=rules.minLength && isValid
        }
        return isValid;
    }
    changeInputHandler=(event,element)=>{
        const updatedOrderForm={
            ...this.state.orderForm
        }
        const updatedFormElement={
            ...updatedOrderForm[element]
        }
        updatedFormElement.value=event.target.value;
        updatedFormElement.valid=this.checkValidity(updatedFormElement.value,updatedFormElement.validation)
        updatedFormElement.touched=true;
        let formIsValid=true;
        for (const key in updatedOrderForm) {
            formIsValid=updatedOrderForm[key].valid && formIsValid;
        }
        updatedOrderForm[element]=updatedFormElement;
        this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid})
    }
    render() {
        const formElementsArray=[];
        for (const key in this.state.orderForm) {
            formElementsArray.push({
                id:key,
                config:this.state.orderForm[key]
            })
        }
        const formElements=formElementsArray.map(formElement=>{
                return <Input 
            key={formElement.id}
            label={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changeHandler={(event)=>this.changeInputHandler(event,formElement.id)}/>
        })
        let form=(
            <form onSubmit={this.orderHandler}>
                    {formElements}
                    <Button btnStyle="Success" disabled={!this.state.formIsValid}>ORDER</Button>
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
