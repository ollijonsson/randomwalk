// Account actions for redux

import database from '../firebase/firebase';

// Insert credentials into firebase database
export const startAddCredentials = (credentials) => {
  return (dispatch, getState) => {
    const uid = getState().auth.user.uid;
      database.ref(`users/${uid}/api`).set({
          apiKey: credentials.apiKey,
          apiSecret: credentials.apiSecret
        }).then((ref) => {
            dispatch(setCredentials())
      })
  }
};

// Set user credentials boolean = false
export const removeCredentials = () => ({
    type: 'REMOVE_CREDENTIALS'
});

// Remove credentials from firebase database
export const startRemoveCredentials = () => {
   return (dispatch, getState) => {
       const uid = getState().auth.user.uid;
       return database.ref(`users/${uid}/api`).remove().then(() => {
           dispatch(removeCredentials());
       });
   };
};

// Set user credentials boolean = true
export const setCredentials = () => ({
    type: 'SET_CREDENTIALS'
});

// Get credentials from firebase
export const startSetCredentials = () => {
    return (dispatch, getState) => {
        const uid = getState().auth.user.uid;
        return database.ref(`users/${uid}/api`).once('value')
        .then((snapshot) => {
            const creds = snapshot.val();
            creds && dispatch(setCredentials());
            if (creds) {
                return true;
            } else {
                return false;
            }
        })
    }
};

