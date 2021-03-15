import React, {createRef} from 'react';
import PropTypes from "prop-types";


class AddMealForm extends React.Component {
    nameRef  = createRef();
    priceRef = createRef();
    statusRef = createRef();
    descRef  = createRef();
    imageRef = createRef();

    static propTypes = {
        addMeal: PropTypes.func
    };
    createMeal = (event) => {
        // stop form from submitting
        event.preventDefault();
        // getting meal data from input via ref
        const meal = {
            name : this.nameRef.current.value,  
            price : parseFloat(this.priceRef.current.value), 
            status : this.statusRef.current.value,
            desc : this.descRef.current.value,  
            image : this.imageRef.current.value, 
        }
        this.props.addMeal(meal);
        // empty out the form
        event.target.reset();
    }
    render() {
        return (
            <form className="meal-edit" onSubmit={this.createFish}>
                <input name="name" ref={this.nameRef} type="text" placeholder="Name"/>
                <input name="price" ref={this.priceRef} type="text" placeholder="Price in Cents"/>
                <select name="status" ref={this.statusRef}>
                    <option value="available">Available</option>
                    <option value="unavailable">Sold OUT!</option>
                </select>
                <textarea name="desc" ref={this.descRef} placeholder="Desc"></textarea>
                <input name="image" ref={this.imageRef} type="text" placeholder="Image"/>
                <button type="submit">+ Add Fish</button>
            </form>
        )
    }
}

export default AddMealForm;