import React from 'react';
import PropTypes from "prop-types";

class EditMealForm extends React.Component {
    static propTypes = {
        meal: PropTypes.shape({
          image: PropTypes.string,
          name: PropTypes.string,
          desc: PropTypes.string,
          status: PropTypes.string,
          price: PropTypes.number
        }),
        index: PropTypes.string,
        updateMeal: PropTypes.func
    };
    handleChange = (event) => {
        // update the meal data
        // first copy the current meal
        const updatedFish = {
            ...this.props.meal,
            [event.currentTarget.name]: event.currentTarget.value,
        }
        this.props.updateMeal(this.props.index, updatedFish);
    }
    render() { 
        return ( 
            <div className="meal-edit">
                <input 
                    type="text" 
                    name="name" 
                    value={this.props.meal.name} 
                    onChange={this.handleChange}/>
                <input 
                    type="text" 
                    name="price" 
                    value={this.props.meal.price} 
                    onChange={this.handleChange}/>
                <select 
                    type="text" 
                    name="status" 
                    value={this.props.meal.status} 
                    onChange={this.handleChange}>
                    <option value="available">Available</option>
                    <option value="unavailable">Sold Out!</option>
                </select>
                <textarea 
                    name="desc" 
                    value={this.props.meal.desc} 
                    onChange={this.handleChange}></textarea>
                <input 
                    type="text" 
                    name="image" 
                    value={this.props.meal.image} 
                    onChange={this.handleChange}/>
                <button onClick={() => this.props.deleteMeal(this.props.index)}>
                    Remove Meal
                </button>
            </div>
        );
    }
}
 
export default EditMealForm; 