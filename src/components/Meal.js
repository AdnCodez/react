import React from 'react';
import PropTypes from "prop-types";
import {formatPrice} from '../helpers'


class Meal extends React.Component {
    // handleClick = () => {
    //     this.props.addToOrder(this.props.index)
    // }
    static propTypes = {
        data: PropTypes.shape({
            name: PropTypes.string,
            image: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        addToOrder: PropTypes.func,
        index: PropTypes.string
    }
    render() {
        const { name, image, price, desc, status } = this.props.data;
        const isAvailable = status === "available";
        return (
            <li className="menu-meal">
               <img src={image} alt={name}/>
               <h3 className="meal-name text-xl">
                    <mark className='bg-yellow-300'>{name}</mark>
                </h3>
                <span className="price">{formatPrice(price)}</span>
                <h4 className="text-xl">{desc}</h4>
                <br/>
                <button className={isAvailable ? "text-xl bg-yellow-300 px-3 hover:bg-yellow-400 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" : "text-xl bg-red-400 px-3 pointer-events-none text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200"} onClick={()=>{this.props.addToOrder(this.props.index)}} disabled={!isAvailable}>{isAvailable ? "Add To Cart" : "Sold OUT!"}</button>
            </li>
        )
    }
}

export default Meal;
