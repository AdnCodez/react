import React, {createRef} from 'react';


class AddFishForm extends React.Component {
    nameRef  = createRef();
    priceRef = createRef();
    statusRef = createRef();
    descRef  = createRef();
    imageRef = createRef();

    createFish = (event) => {
        // stop form from submitting
        event.preventDefault();
        // getting fish data from input via ref
        const fish = {
            name : this.nameRef.current.value,  
            price : parseFloat(this.priceRef.current.value), 
            status : this.statusRef.current.value,
            desc : this.descRef.current.value,  
            image : this.imageRef.current.value, 
        }
        this.props.addFish(fish);
        // empty out the form
        event.target.reset();
    }
    render() {
        return (
            <form className="fish-edit" onSubmit={this.createFish}>
                <input name="name" ref={this.nameRef} type="text" placeholder="Name"/>
                <input name="price" ref={this.priceRef} type="text" placeholder="Price"/>
                <select name="status" ref={this.statusRef}>
                    <option value="available">Fresh</option>
                    <option value="unavailable">Sold OUT!</option>
                </select>
                <textarea name="desc" ref={this.descRef} placeholder="Desc"></textarea>
                <input name="image" ref={this.imageRef} type="text" placeholder="Image"/>
                <button type="submit">+ Add Fish</button>
            </form>
        )
    }
}

export default AddFishForm;