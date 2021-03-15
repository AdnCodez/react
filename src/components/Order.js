import React from 'react';
import PropTypes from "prop-types";
import { formatPrice } from '../helpers';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
class Order extends React.Component {
    static propTypes = {
        meals: PropTypes.object,
        order: PropTypes.object,
        removeFromOrder: PropTypes.func
    };    
    renderOrder = key => {
        const meal = this.props.meals[key];
        const count = this.props.order[key];
        const isAvailable = meal && meal.status === 'available';
        const transitionOptions = {
            classNames: "order",
            key,
            timeout:{enter: 500, exit:500}
        }
        // this assures that the meal is loaded before we fill in the order
        if (!meal) return null;
        if (!isAvailable) {
            return (
                <CSSTransition {...transitionOptions}>
                    <li key={key}> Sorry {meal ? meal.name : 'meal'} is no longer available </li>
                </CSSTransition>
            );
        }
        return (
            <CSSTransition {...transitionOptions}>
                <li key={key}>
                    <span>
                        <TransitionGroup component="span" className="count">
                            <CSSTransition classNames="count" key={count} timeout={{enter:500, exit:500}}>
                                <span>{count}</span>
                            </CSSTransition>
                        </TransitionGroup>
                        lbs {meal.name}
                        {formatPrice(count * meal.price)}
                        <button className="bg-red-500 px-6 hover:bg-red-600 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 p-2 ml-6" onClick={() => this.props.deleteFromOrder(key)}> <span className="text-2xl p-2">&times;</span> </button>
                    </span>
                </li>
            </CSSTransition>
        );
    };
    render() {
        const orderIds = Object.keys(this.props.order);
        const total = orderIds.reduce((prevTotal, key) => {
            const meal = this.props.meals[key];
            const count = this.props.order[key];
            const isAvailable = meal && meal.status === 'available';
            if (isAvailable) {
                return prevTotal + count * meal.price;
            }
            return prevTotal;
        }, 0);
        return (
            <div className="order-wrap lg:px-6">
                <h1>Order</h1>
                <TransitionGroup component="ul" className="order">
                    {orderIds.map(this.renderOrder)}
                </TransitionGroup>
                <div className="total">
                    Total:
                    <strong>{formatPrice(total)}</strong>
                </div>
            </div>
        );
    }
}

export default Order;
