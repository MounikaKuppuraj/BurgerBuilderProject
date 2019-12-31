import React, { Component } from 'react'
import Auxillary from '../../hoc/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
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
        totalPrice:4
    }
    addIngredients=(type)=>{
        const oldCount=this.state.ingredients[type];
        const updatedCount=oldCount+1;
        const updatedIngredients={...this.state.ingredients};
        updatedIngredients[type]=updatedCount;
        const newPrice=INGREDIENT_PRICES[type];
        const updatedPrice=this.state.totalPrice+newPrice;
        this.setState({ingredients:updatedIngredients,totalPrice:updatedPrice})
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
        this.setState({ingredients:updatedIngredients,totalPrice:updatedPrice})
    }
    render() {
        const disabledInfo={...this.state.ingredients}
        for (const key in disabledInfo) {
            disabledInfo[key]=disabledInfo[key]<=0
        }
        return (
            <Auxillary>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                addIngredient={this.addIngredients}
                removeIngredient={this.removeIngredient}
                disabled={disabledInfo}
                price={this.state.totalPrice}/>
            </Auxillary>
        )
    }
}

export default BurgerBuilder;