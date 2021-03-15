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
                <h1 className="font-bold text-4xl mb-4">Welcome to Startup</h1>
                <p className="text-gray-600 py-2 text-2xl">Claim your restaurant menu name</p>
                <form className="flex flex-col">
                    <div className="mb-6 pt-3 rounded bg-gray-200">
                    <span className="block text-gray-700 text-sm font-bold ml-3 border">Enter Store Name</span>
                    <input type="text" ref={this.myInput} required placeholder="Store Name" defaultValue="Burger King" className="text-2xl bg-gray-200 rounded w-full text-gray-700 focus:outline-none border-2 border-gray-300 focus:border-yellow-400 transition duration-500 p-3"/>
                    </div>
                    <button type="submit" onClick={this.handleClick} className="bg-yellow-300 hover:bg-yellow-400 text-white  py-2 rounded shadow-lg hover:shadow-xl transition duration-200 p-5 ">Visit Menu</button>
                </form>
            </div>
        ) 
    }
}

export default StorePicker;