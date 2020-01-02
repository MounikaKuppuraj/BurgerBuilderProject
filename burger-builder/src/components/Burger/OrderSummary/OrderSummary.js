import React,{Component} from 'react';
import Auxillary from '../../../hoc/Auxillary/Auxillary';
import Button from '../../UI/Button/Button';
class OrderSummary extends Component {
    render(){
        const ingredientsSummary=Object.keys(this.props.ingredients).map(ingredient=>{
            return (<li key={ingredient}>
            <p><span style={{textTransform:'capitalize'}}>{ingredient}</span> : {this.props.ingredients[ingredient]}</p>
            </li>);
        })
        return(
        <Auxillary>
            <h3>Your Order</h3>
            <p>A delicious burger is ready with following ingredients:</p>
            <ul>
                {ingredientsSummary}
            </ul>
            <p><strong>Total Price : ${this.props.price.toFixed(2)}</strong></p>
            <p>Continue to checkout</p>
            <Button btnStyle="Danger" clicked={this.props.purchaseCancel}>CANCEL</Button>
            <Button btnStyle="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
        </Auxillary>
        );
    }
    
}

export default OrderSummary
