import React, { Component } from 'react'
import Auxillary from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
const INGREDIENT_PRICES={
    meat:5,
    bacon:3.5,
    cheese:0.5,
    salad:1.5
}
class BurgerBuilder extends Component {
    state={
        ingredients:{
        meat:0,
        bacon:0,
        cheese:0,
        salad:0
        },
        purchaseable:false,
        purchasing:false,
        totalPrice:4
    }
    
    addIngredients=(type)=>{
        const oldCount=this.state.ingredients[type];
        const updatedCount=oldCount+1;
        const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedCount;
        const newPrice=INGREDIENT_PRICES[type];
        const updatedPrice=this.state.totalPrice+newPrice;
        this.setState({ingredients:updatedIngredients,totalPrice:updatedPrice});
        this.updatepurchaseHandler(updatedIngredients);
    }
    removeIngredient=(type)=>{
        const oldCount=this.state.ingredients[type];
        if(oldCount===0){
            return;
        }
        const updatedCount=oldCount-1;
        const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedCount;
        const newPrice=INGREDIENT_PRICES[type];
        const updatedPrice=this.state.totalPrice-newPrice;
        this.setState({ingredients:updatedIngredients,totalPrice:updatedPrice});
        this.updatepurchaseHandler(updatedIngredients);
    }
    updatepurchaseHandler=(ingredients)=>{
        const sum=Object.keys(ingredients).map(ingredient=>ingredients[ingredient])
        .reduce((acc,cur)=>acc+cur,0);
        this.setState({purchaseable:sum>0})
    }
    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }
    purchaseContinueHandler=()=>{
        const order={
            ingredients:this.state.ingredients,
            totalPrice:this.state.totalPrice,
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
        .then(response=>console.log(response))
        .catch(error=>console.log(error))
    }
    render() {
        const disabledInfo={...this.state.ingredients}
        for (const key in disabledInfo) {
            disabledInfo[key]=disabledInfo[key]<=0
        }
        return (
            <Auxillary>
                <Modal show={this.state.purchasing} purchaseCancel={this.purchaseCancelHandler}>
                    <OrderSummary  
                    ingredients={this.state.ingredients} 
                    price={this.state.totalPrice}
                    purchaseCancel={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                addIngredient={this.addIngredients}
                removeIngredient={this.removeIngredient}
                disabled={disabledInfo}
                price={this.state.totalPrice}
                purchaseable={!this.state.purchaseable}
                purchasing={this.purchaseHandler}/>
            </Auxillary>
        )
    }
}

export default BurgerBuilder;