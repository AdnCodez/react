import React from 'react';
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
        console.log(this.state.order);
        localStorage.setItem(this.props.match.params.storeId, JSON.stringify(this.state.order))
        // console.log('it updated');
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
    loadSampleFishes = () => {
        this.setState({fishes:sampleFishes})
    }
    addToOrder = key => {
        // copy of state
        const order = { ...this.state.order }
        // add new item to order or update existing one
        order[key] = order[key] + 1 || 1
        // update out state object
        this.setState({order})

    }
    render() {
        return (
            <div className="catch-of-the-day">
                <div className="menu">
                    <Header tagline="Fresh SeaFood Market"/>
                    <ul className="fishes">
                        {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} data={this.state.fishes[key]} addToOrder={this.addToOrder}/>)}
                    </ul>
                </div>
                <Order fishes={this.state.fishes} order={this.state.order}/>
                <Inventory addFish={this.addFish} updateFish={this.updateFish} loadSampleFishes={this.loadSampleFishes} fishes={this.state.fishes}/>
            </div>
        )
    }
}


export default App;
