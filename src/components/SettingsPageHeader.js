// Setting page header component
// Display users google image and name

import React from 'react';
import { connect } from 'react-redux';

const SettingsPageHeader = (props) => (
  <div className="page-header">
    <div className="content-container">
      <div className="summary-container">
        <h2 className="page-header__title">Settings</h2>
        <div className="summary-container2">
          <h3 className="page-header__subtitle">{props.auth.user.displayName}</h3>
          <img className="page-header__image" src={props.auth.user.photoURL} />
        </div>
      </div> 
    </div>
  </div>
);

const mapStateToProps = (state) => {
  return state;
}

export default connect(mapStateToProps)(SettingsPageHeader);