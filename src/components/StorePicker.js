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
            <div className="bg-white max-w-3xl mx-auto p-8 md:p-20 my-10 rounded-lg shadow-2xl">
                <h3 class="font-bold text-2xl">Welcome to Startup</h3>
                <p class="text-gray-600 pt-2">Claim your Restaurant menu name</p>
                <form className="flex flex-col">
                    <div className="mb-6 pt-3 rounded bg-gray-200">
                        
                    <span className="block text-gray-700 text-sm font-bold mb-2 ml-3">Please Enter a store name</span>
                    <input type="text" ref={this.myInput} required placeholder="Store Name" defaultValue={getFunName()} className="bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-b-4 border-gray-300 focus:border-yellow-400 transition duration-500 px-3 pb-3"/>
                    </div>
                    <button type="submit" onClick={this.handleClick} className="bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 p-5"> Visit Store -&gt;</button>
                </form>
            </div>
        ) 
    }
}

export default StorePicker;