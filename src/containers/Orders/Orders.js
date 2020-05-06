import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json').then(res => {
            const fetchedOrders = [];
            for (let key in res.data) { //key is the obj of all data for ex its M6GwI06boVVQrJav9B and A6GwsdgboVVQrJav9B
                fetchedOrders.push({
                    ...res.data[key],
                    id: key
                });
            }
            this.setState({ loading: false, orders:fetchedOrders });
        }).catch(err => {
            this.setState({ loading: false });
            this.props.err(true,err.message);
        });
    }

    render() {
        // let orders = <Spinner></Spinner>;
        // let orders=null;
        // if(this.state.orders){
        //     this.state.orders.map(order =>{
        //         return <Order orderPrice={order.price} orderIng={order.ingredients}></Order>;
        //     });
        // }

        return (
            <div>
                {this.state.orders.map(order =>{
                    return <Order orderPrice={order.price} orderIng={order.ingredients} key={order.id}></Order>; 
                })}
            </div>
        );
    }
}

export default withErrorHandler(Orders); 
//A + IN {order.price} LIKE {+order.price} SHOULD ALSO DO THE TRICK OF Number.parseFloat INSIDE OF ORDER COMPONENT