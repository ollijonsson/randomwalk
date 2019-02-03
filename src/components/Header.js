// Header component

import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { startLogout } from '../actions/auth';

export const Header = ({ startLogout }) => (
    <header className="header">
        <div className="content-container">
            <div className="header__content">
                <Link className="header__title" to="/">
                    <h1>Mercatura Trading</h1>
                </Link>
                <div className="header__right">
                    <Link to="/about">
                        <img className="settings_image" src="/images/info-button.png"/>
                    </Link>
                    <Link to="/settings">
                        <img className="settings_image" src="/images/settings-button.png"/>
                    </Link>
                    <button className="button button--link" onClick={startLogout}>Logout</button>
                </div>
            </div>
        </div>
    </header>
);

const mapDispatchToProps = (dispatch) => ({
    startLogout: () => dispatch(startLogout())
});

export default connect(undefined, mapDispatchToProps)(Header);
