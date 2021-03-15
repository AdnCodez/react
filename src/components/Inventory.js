import React from 'react';
import PropTypes from "prop-types";
import firebase from 'firebase';
import AddMealForm from './AddMealForm';
import EditMealForm from './EditMealForm';
import Login from './Login';
import base, { firebaseApp } from '../base';
class Inventory extends React.Component {
    static propTypes = {
        meals: PropTypes.object,
        updateMeal: PropTypes.func,
        deleteMeal: PropTypes.func,
        loadSampleMeals: PropTypes.func,
        addMeal: PropTypes.func
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
        await firebase.auth().signOut();
        this.setState({ uid: null });
    }
    render() {
        const logout = <button className="bg-red-500 px-6 mb-3 hover:bg-red-600 text-white py-2 rounded shadow-lg hover:shadow-xl transition duration-200 w-3/6 m-auto" onClick={this.logout}>Log Out!</button>;
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
            <div className="lg:rounded-r-2xl lg:pr-6">
                <h1>Inventory</h1>
                {Object.keys(this.props.meals).map(key => (
                <EditMealForm 
                    key={key} 
                    index={key} 
                    meal={this.props.meals[key]} 
                    updateMeal={this.props.updateMeal}
                    deleteMeal={this.props.deleteMeal}/>
                ))}
                <AddMealForm addMeal={this.props.addMeal} />
                <div className="text-center grid content-center">
                    <button className="bg-gray-300 px-6 mb-3 hover:bg-gray-400 text-white py-2 rounded shadow-lg hover:shadow-xl transition duration-200" onClick={this.props.loadSampleMeals}>Load Sample Fishes</button>
                    {logout}
                </div>

            </div>
        )
    }
}

export default Inventory;

