import React from 'react';
import PropTypes from 'prop-types'

const Login = (props) => (
    <nav className="login text-center">
        <h1>Inventory Login</h1>
        <p className="mb-6">Sign in to manage your store's inventory</p>
        <div className="md:space-x-10">
            <button className="bg-yellow-300 px-6 hover:bg-yellow-400 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200 mb-6" onClick={()=> props.authenticate('Github')}>Log In With Github</button>
            <button className="bg-yellow-300 px-6 hover:bg-yellow-400 text-white font-bold py-2 rounded shadow-lg hover:shadow-xl transition duration-200" onClick={()=> props.authenticate('Google')}>Log In With Google</button>
        </div>
    </nav>
); 

Login.propTypes = {
    authenticate: PropTypes.func.isRequired,
}

export default Login;