# Cryptocurrency random walk generator


## About
The random walk generator is a built-for-fun web gui for TradeSatoshi's cryptocurrency exchange. It allows users to connect their TradeSatoshi account and view balances, trade history and more. This app's main function is a random order generator which, using certain parameters, selects a random market and posts a trade order on the user's TradeSatoshi account, e.g. buys a random cryptocurrency for an amount chosen by the user. \
\
It's mainly written as an exercise in ReactJS. Use at own risk, I do not endorse gambling of any form. \
\
See https://tradesatoshi.com/Home/Api for more information.
### The idea
Many theorists examine the behavior of stock prices, and the random walk hypothesis attempts to explain why stocks move the way they do. The random walk hypothesis states that stock market prices change in a random manner, and therefore, you can't predict what price movements will occur in advance. The theory argues that each change is independent of previous changes, and so the trends that many investors see in stock charts aren't meaningful.

### Attention!
For authenticating and communicating with TradeSatoshi private API services, this application needs a middleware running server-side. The app is built around Firebase and relies on Google Auth services for login and it's database for storing user credentials.

### Developing with web-pack
```
npm install
npm run dev-server
```
### Building for production with web-pack
```
npm build:prod
```