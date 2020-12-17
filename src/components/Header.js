import React from 'react';
import PropTypes from "prop-types"


const Header = (props) => (
    <header className='top'>
        <h1 className="text-sm">{props.storeName.params.storeId}</h1>
        <h3 className="" >
            menu
        </h3>
    </header>   
);

Header.propTypes = {
    tagline: PropTypes.string.isRequired
};


export default Header;