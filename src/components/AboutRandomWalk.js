// Information component

import React from 'react';

const AboutRandomWalk = () => (
    <div>
        <div className="page-header">
            <div className="content-container">
                <h2 className="page-header__title">Information</h2>
            </div>
        </div>
        <div className="content-container random-walk">
        <h3>Connecting to TradeSatoshi</h3>
        <p className="instructions">
        To connect the Mercatura Trading app to your TradeSatoshi account, navigate to <span>API settings</span> under your profile, enable API and then copy your API key and API secret into the settings page of this app. Your API credentials will be stored in a safe database location only accessible by your Google account and they will never be visible to browsers or client-side code.
        </p>
        <h3>The Random Walk</h3>
        <p className="instructions">
        The main function of this application is an algorithm that generates an order for a random market at the TradeSatoshi exchange, based on your prefrences of basecurrency and amount. When pressed, the <span>Random Walk</span> button instantly generates an order, resulting in a random currency being bought. We take no responsibility of your use of the application and recommend that it is used with caution.
        </p>
        <h3>Basecurrencies</h3>
        <p className="instructions">
        In order to use the Random Walk generetor you are required to have <span>a balance</span> higher than the minimum trade of any <span>basecurrency</span> on TradeSatoshi.
        </p>
        <div className="instructions-baselist">
            <div className="instructions-basecurrency instructions-header"><div>Basecurrency</div><div>Minimum trade</div></div>
            <div className="instructions-basecurrency"><div>BTC</div><div>0.00001000</div></div>
            <div className="instructions-basecurrency"><div>USDT</div><div>0.01000000</div></div>
            <div className="instructions-basecurrency"><div>DOGE</div><div>1.00000000</div></div>
            <div className="instructions-basecurrency"><div>ETH</div><div>0.00001000</div></div>
            <div className="instructions-basecurrency"><div>LTC</div><div>0.00010000</div></div>
        </div>
        <h3>The Hypothesis</h3>
        <p className="instructions">
            Many theorists examine the behavior of stock prices, and the <span>random walk hypothesis</span> attempts to explain why stocks move the way they do. The random walk hypothesis states that stock market prices change in a random manner, and therefore, you can't predict what price movements will occur in advance. The theory argues that each change is independent of previous changes, and so the trends that many investors see in stock charts aren't meaningful. Made popular by Professor Burton Malkiel of Princeton in his 1973 book A Random Walk Down Wall Street, the random walk hypothesis has implications for both short-term traders and long-term investors.
        </p>
        </div>
    </div>
);

export default AboutRandomWalk;