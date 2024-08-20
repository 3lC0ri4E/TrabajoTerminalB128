import React, { useEffect } from 'react';

export default function Main() {
    useEffect(() => {
        const script = document.createElement('script');
        script.src = 'https://co-in.io/es/widget/pricelist.js?items=BTC';
        // script.async = true;

        script.onload = () => {
            if (window.crCryptocoinPriceWidget) {
                window.crCryptocoinPriceWidget.init({
                    base: "USD,MXN",
                    items: "BTC",
                    backgroundColor: "3C3C3C",
                    streaming: "1",
                    rounded: "1",
                    boxShadow: "1",
                    border: "1"
                });
            }
        };


        document.body.appendChild(script);

        // Limpieza del script para evitar múltiples cargas
        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div>
            <div id="crypto-price-widget"></div>
            {/* <a href="https://currencyrate.today/" rel="noopener" target="_blank"> */}
            {/* CurrencyRate.Today */}
            {/* </a> */}
        </div>
    );
}
