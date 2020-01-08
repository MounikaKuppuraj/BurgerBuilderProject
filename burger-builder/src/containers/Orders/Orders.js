import React, { Component } from 'react'
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorhandler/withErrorHandler';
class Orders extends Component {
    state={
        orders:[],
        loading:true
    }
    componentDidMount(){
        axios.get('/orders.json')
        .then(response=>{
            let fetchOrders=[];
            for (const key in response.data) {
                fetchOrders.push({
                    ...response.data[key],
                    id:key
                })
            }
            this.setState({orders:fetchOrders})
            this.setState({loading:false})
        })
        .catch(error=>{
            this.setState({loading:false})
        })
    }
    render() {
        const orders=this.state.orders.map(order=>{
            return <Order key={order.id} 
            ingredients={order.ingredients} 
            price={order.totalPrice}/>
        })
        return (
            <div>
               {this.state.error ? <Spinner/> : orders}
            </div>
        )
    }
}
export default withErrorHandler(Orders,axios);
