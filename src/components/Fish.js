import React from 'react';
import PropTypes from "prop-types";
import {formatPrice} from '../helpers'


class Fish extends React.Component {
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
        addToOrder: PropTypes.func
    }
    render() {
        const { name, image, price, desc, status } = this.props.data;
        const isAvailable = status === "available";

        return (
            <li className="menu-fish">
               <img src={image} alt={name}/>
               <h3 className="fish-name">
                    {name}
                    <span className="price">{formatPrice(price)}</span>
                </h3>
                <p>{desc}</p>
                <button onClick={()=>{this.props.addToOrder(this.props.index)}} disabled={!isAvailable}>{isAvailable ? "Add To Cart" : "Sold OUT!"}</button>
            </li>
        )
    }
}

export default Fish;
