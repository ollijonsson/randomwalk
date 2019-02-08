// Fetch data from exchange through NodeJS API

import database from '../firebase/firebase';
import axios from 'axios';

// Return axios fetch from API
export const getFromApi = async (method, params, uid) => {
  let obj = {};
  await database.ref(`users/${uid}/api`).once('value')
  .then((snapshot) => {
      obj = {
          apiKey: snapshot.val().apiKey,
          secret: snapshot.val().apiSecret,
      }
  });

  return axios({
    // URL for express API
    url: "https://tradesatoshiapi.olafur.io/",
    method: "POST",
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    data: {
        apiKey: obj.apiKey,
        secret: obj.secret,
        params: params,
        method: method
    },
    responseType: 'json'
  }).then(response => {
    return response.data;
  }).catch(e => {
    return { error: e, message: "Error connecting to API middleware." };
  });
}

export default getFromApi;