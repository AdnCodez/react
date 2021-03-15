import React from 'react';
import PropTypes from "prop-types";
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Meal from './Meal'
import sampleMeals from '../sample-meals'
import base from '../base'
class App extends React.Component {
    state = {
        meals: {},
        order: {}
    }
    static propTypes = {
        match: PropTypes.object
    };
    componentDidMount() {
        const {params} = this.props.match;
        // reinstate localStorage
        const localStorageRef = localStorage.getItem(params.storeId);
        if (localStorageRef) {
            this.setState({order: JSON.parse(localStorageRef)})
        }
        this.ref = base.syncState(`${params.storeId}/meals`, {
            context: this,
            state: 'meals'
        })
    }
    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    }
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }
    addMeal = (meal) => {
        // create a copy of state
        const meals = { ...this.state.meals };

        meals[`meal${Date.now()}`] = meal;

        this.setState({ meals });
    }
    updateMeal = (key, updatedFish) => {
        // copy the current state
        const meals = {...this.state.meals};
        // update the copied state
        meals[key] = updatedFish;
        // set that to state
        this.setState({ meals });
    }
    deleteMeal = (key) => {
        // copy state
        const meals = {...this.state.meals};
        // remove item from state, update state (need to be set to null to get removed from firebase)
        meals[key] = null;
        // update state
        this.setState({meals});
    } 
    loadSampleMeals = () => {
        this.setState({meals:sampleMeals})
    }
    addToOrder = key => {
        // copy of state
        const order = { ...this.state.order }
        // add new item to order or update existing one
        order[key] = order[key] + 1 || 1;
        // update out state object
        this.setState({order})
    }
    deleteFromOrder = key => {
        const order = { ...this.state.order };
        delete order[key];
        this.setState({order})
    }
    render() {
        return (
            <div className="catch-of-the-day max-w-lg mx-auto p-md-8 p-2 md:p-12 my-10 rounded-lg shadow-2xl">
                <div className="menu p-12 lg:rounded-l-2xl">
                    <Header tagline="Fresh Food Market" storeName={this.props.match}/>
                    <ul className="meals">
                        {Object.keys(this.state.meals).map(key => <Meal key={key} index={key} data={this.state.meals[key]} addToOrder={this.addToOrder}/>)}
                    </ul>
                </div>
                <Order meals={this.state.meals} deleteFromOrder={this.deleteFromOrder} order={this.state.order}/>
                <Inventory addMeal={this.addMeal} updateMeal={this.updateMeal} deleteMeal={this.deleteMeal} loadSampleMeals={this.loadSampleMeals} meals={this.state.meals} storeId={this.props.match.params.storeId}/>
            </div>
        )
    }
}


export default App;
