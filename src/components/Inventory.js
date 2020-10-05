import React from 'react';
import PropTypes from "prop-types";
import firebase from 'firebase';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import base, { firebaseApp } from '../base';
class Inventory extends React.Component {
    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func,
        addFish: PropTypes.func
    };

    state = {
        uid: null,
        owner: null
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                this.authHandler({ user });
            }
        });
    }
    authHandler = async (authData) => {
        // console.log(authData);
        // look up the current store in firebase DB
        const store = await base.fetch(this.props.storeId, {context : this});
        // console.log(store);
        // claim it if there is no owner
        if (!store.owner) {
            // clame it
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
                // might change this to email
            })
        }
        // set the state of the inventory component to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        })
    }

    authenticate = (provider) => {
        // create an auth provider for all the auth methodes in login commponent
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp.auth().signInWithPopup(authProvider).then(this.authHandler);
    }
    logout = async () => {
        console.log('loggin out!');
        await firebase.auth().signOut();
        this.setState({ uid: null });
    }
    render() {
        const logout = <button onClick={this.logout}>Log Out!</button>;
        // check if someone is logged in
        if (!this.state.uid) {
            return <Login authenticate={this.authenticate}/>
        }
        // check if the logged in user is not the owner of store
        if (this.state.uid !== this.state.owner ) {
            return (
                <div>
                    <p>Sorry you are not the owner of this store!</p>
                    {logout}
                </div>
            )
        }
        // render the inventory the have to be the owner
        return (
            <div>
                <h1>Inventory</h1>
                {logout}
                {Object.keys(this.props.fishes).map(key => (
                <EditFishForm 
                    key={key} 
                    index={key} 
                    fish={this.props.fishes[key]} 
                    updateFish={this.props.updateFish}
                    deleteFish={this.props.deleteFish}/>
                ))}
                <AddFishForm addFish={this.props.addFish} />
                <button onClick={this.props.loadSampleFishes}>Load Sample Fishes</button>
            </div>
        )
    }
}

export default Inventory;

