// Dynamic form for adding API key / secret 

import React from 'react';

export default class KeyForm extends React.Component {

    // Locally stored values
    constructor(props) {
        super(props);
        this.state = {
            apiKey: '',
            apiSecret: ''
        }
    }

    // On input in API key form
    onKeyChange = (e) => {
        const apiKey = e.target.value;
        this.setState(() => ({ apiKey }));
    }

    // On input in API secret form
    onSecretChange = (e) => {
        const apiSecret = e.target.value;
        this.setState(() => ({ apiSecret }));
    }

    // On submitting
    onSubmit = (e) => {
        e.preventDefault();
        if (!this.state.apiKey || !this.state.apiSecret) {
            this.setState(() => ({ error: 'Please put in your API credentials from Trade Satoshi'}));
        } else {
            const apiKey = this.state.apiKey.trim();
            const apiSecret = this.state.apiSecret.trim();
            const credentials = {
                apiKey: apiKey,
                apiSecret: apiSecret
            }
            this.setState(() => ({ error: '' }));
            this.props.onSubmit(credentials);
        }
    }
    
    render() {
        return (
            <form className="form" onSubmit={this.onSubmit}>
                {this.state.error && <p className="form__error">{this.state.error}</p>}
                <input
                    className="text-input"
                    type="text"
                    placeholder="API key"
                    autoFocus
                    value={this.state.apikey}
                    onChange={this.onKeyChange}
                />
                <input
                    className="text-input"
                    type="text"
                    placeholder="API secret"
                    autoFocus
                    value={this.state.apiSecret}
                    onChange={this.onSecretChange}
                />
                <div>
                    <button className="button">Submit</button>
                </div>
            </form>
        )
    }
}