import React from 'react';
import PropTypes from "prop-types";
import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import Fish from './Fish'
import sampleFishes from '../sample-fishes'
import base from '../base'
class App extends React.Component {
    state = {
        fishes: {},
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
        this.ref = base.syncState(`${params.storeId}/fishes`, {
            context: this,
            state: 'fishes'
        })
    }
    componentDidUpdate() {
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
    }
    componentWillUnmount() {
        base.removeBinding(this.ref);
    }
    addFish = (fish) => {
        // create a copy of state
        const fishes = { ...this.state.fishes };

        fishes[`fish${Date.now()}`] = fish;

        this.setState({ fishes });
    }
    updateFish = (key, updatedFish) => {
        // copy the current state
        const fishes = {...this.state.fishes};
        // update the copied state
        fishes[key] = updatedFish;
        // set that to state
        this.setState({ fishes });
    }
    deleteFish = (key) => {
        // copy state
        const fishes = {...this.state.fishes};
        // remove item from state, update state (need to be set to null to get removed from firebase)
        fishes[key] = null;
        // update state
        this.setState({fishes});
    } 
    loadSampleFishes = () => {
        this.setState({fishes:sampleFishes})
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
            <div className="catch-of-the-day max-w-lg mx-auto p-8 md:p-12 my-10 rounded-lg shadow-2xl">
                <div className="menu p-12 rounded-xl">
                    <Header tagline="Fresh SeaFood Market" storeName={this.props.match}/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} data={this.state.fishes[key]} addToOrder={this.addToOrder}/>)}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} deleteFromOrder={this.deleteFromOrder} order={this.state.order}/>
                <Inventory addFish={this.addFish} updateFish={this.updateFish} deleteFish={this.deleteFish} loadSampleFishes={this.loadSampleFishes} fishes={this.state.fishes} storeId={this.props.match.params.storeId}/>
            </div>
        )
    }
}


export default App;
