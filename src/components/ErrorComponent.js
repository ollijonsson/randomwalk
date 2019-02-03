// Error component

import React from 'react';

const ErrorComponent = ({ error, message }) => (
    <div className="text__error">
        {message} 
    </div> 
);

export default ErrorComponent;