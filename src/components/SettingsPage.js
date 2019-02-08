// Settings page

import React from 'react';
import { connect } from 'react-redux';
import { startAddCredentials } from '../actions/account';
import { startRemoveCredentials } from '../actions/account';
import { getEverything, startRemoveEverything } from '../actions/trading';
import { removeError } from '../actions/errors';

// Importing components
import SettingsPageHeader from './SettingsPageHeader';
import AddCredentialsForm from './AddCredentialsForm';

export class SettingsPage extends React.Component {

    // On form submit
    onSubmit = (credentials) => {
        this.props.startAddCredentials(credentials);
        this.props.getEverything();
        this.props.history.push('/');
    }

    // On remove credentials button pressed
    onRemove = () => {
      this.props.startRemoveCredentials();
      this.props.startRemoveEverything();
      this.props.removeError();
      this.props.history.push('/settings');
    }
    
    render() {
        return (
            <div>
                <SettingsPageHeader />
                <div className="content-container">
                {
                this.props.account.areCredentials ? (
                    <div className="settings-credentials">Your API credentials are stored. <button className="button--link" onClick={this.onRemove}>Remove credentials</button></div>
                  ) : (
                    <AddCredentialsForm onSubmit={this.onSubmit} />
                  )
                }   
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => ({
    startAddCredentials: (credentials) => dispatch(startAddCredentials(credentials)),
    startRemoveCredentials: () => dispatch(startRemoveCredentials()),
    getEverything: () => dispatch(getEverything()),
    startRemoveEverything: () => dispatch(startRemoveEverything()),
    removeError: () => dispatch(removeError())
})

export default connect(mapStateToProps, mapDispatchToProps)(SettingsPage);