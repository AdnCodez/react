import React, { createRef } from "react";
import PropTypes from "prop-types";
import { getFunName } from '../helpers';

class StorePicker extends React.Component {
    myInput = createRef();
    
    static propTypes = {
        history: PropTypes.object
    };
    handleClick = (event) => {
        // this will stop the form from submitting
        event.preventDefault()
        // this will give us the value of the input field
        const storeName = this.myInput.current.value;
        // change the location to /store/myInput
        this.props.history.push(`/store/${storeName}`)

    }
    render() {
        return (
            <form className="store-selector">
                <h2>Please Enter a store name</h2>
                <input type="text" ref={this.myInput} required placeholder="Store Name" defaultValue={getFunName()}/>
                <button type="submit" onClick={this.handleClick}> Visit Store -&gt;</button>
            </form>
        ) 
    }
}

export default StorePicker;