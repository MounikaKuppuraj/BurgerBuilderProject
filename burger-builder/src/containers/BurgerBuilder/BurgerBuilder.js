import React, { Component } from 'react'
import Auxillary from '../../hoc/Auxillary/Auxillary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/Spinner/Spinner';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorhandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actionTypes from '../../store/action';
class BurgerBuilder extends Component {
    state={
        purchasing:false,
        error:false
    }
    // componentDidMount(){
    //     axios.get('/ingredients.json')
    //     .then(response=>{
    //         this.setState({ingredients:response.data})
    //     })
    //     .catch(error=>{
    //         this.setState({error:true})
    //     })
    // }
    updatepurchaseHandler=(ingredients)=>{
        const sum=Object.keys(ingredients).map(ingredient=>ingredients[ingredient])
        .reduce((acc,cur)=>acc+cur,0);
        return sum>0
    }
    
    purchaseHandler=()=>{
        this.setState({purchasing:true})
    }
    purchaseCancelHandler=()=>{
        this.setState({purchasing:false})
    }
    purchaseContinueHandler=()=>{
    //    const queryParams=[];
    //     for (const i of Object.keys(this.props.ingredients)) {
    //         queryParams.push(i+"="+this.props.ingredients[i])
    //     }
    //     queryParams.push("price="+this.props.totalPrice)
    //     const queryString=queryParams.join('&');
        this.props.history.push('/checkout');
    }
    render() {
        const disabledInfo={...this.props.ingredients}
        for (const key in disabledInfo) {
            disabledInfo[key]=disabledInfo[key]<=0
        }
        const style={
            textAlign:'center',
            color:'red',
            fontWeight:'bold'
        }
        let orderSummary=null
        let burger=this.state.error ? <p style={style}>Can't load ingredients</p> : <Spinner/>
        if(this.props.ingredients){
            orderSummary= <OrderSummary  
            ingredients={this.props.ingredients} 
            price={this.props.totalPrice}
            purchaseCancel={this.purchaseCancelHandler}
            purchaseContinue={this.purchaseContinueHandler}/>
            burger=(
                <Auxillary>
                <Burger ingredients={this.props.ingredients}/>
                <BuildControls 
                addIngredient={this.props.onAddIngredient}
                removeIngredient={this.props.onRemoveIngredient}
                disabled={disabledInfo}
                price={this.props.totalPrice}
                purchaseable={!this.updatepurchaseHandler(this.props.ingredients)}
                purchasing={this.purchaseHandler}/>
                </Auxillary>
            )
        }
        return (
            <Auxillary>
                <Modal show={this.state.purchasing} purchaseCancel={this.purchaseCancelHandler}>
                   {orderSummary}
                </Modal>
                {burger}
            </Auxillary>
        )
    }
}
const mapStateToProps=state=>{
    return{
        ingredients:state.ingredients,
        totalPrice:state.totalPrice
    }
}
const mapDispatchToProps=dispatch=>{
    return{
        onAddIngredient:(ingName)=>dispatch({type:actionTypes.ADD_INGREDIENT,ingredientName:ingName}),
        onRemoveIngredient:(ingName)=>dispatch({type:actionTypes.REMOVE_INGREDIENT,ingredientName:ingName})
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));