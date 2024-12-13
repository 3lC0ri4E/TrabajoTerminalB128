/** @format */

// BitcoinLineChart.jsx
import React, { useEffect, useRef, memo } from 'react';

function BitcoinLineChart() {
	const container = useRef();

	useEffect(() => {
		const script = document.createElement('script');
		script.src =
			'https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js';
		script.type = 'text/javascript';
		script.async = true;
		script.innerHTML = `
        {
          "symbols": [
            [
              "BTCUSD",
              "BITSTAMP:BTCUSD|12M"
            ],
            [
              "BTCMXN",
              "BINANCE:BTCMXN|12M"
            ]
          ],
          "chartOnly": false,
          "width": "100%",
          "height": "100%",
          "locale": "es",
          "colorTheme": "dark",
          "autosize": true,
          "showVolume": false,
          "showMA": false,
          "hideDateRanges": false,
          "hideMarketStatus": false,
          "hideSymbolLogo": false,
          "scalePosition": "right",
          "scaleMode": "Normal",
          "fontFamily": "Times, Times New Roman, serif",
          "fontSize": "12",
          "noTimeScale": false,
          "valuesTracking": "1",
          "changeMode": "price-and-percent",
          "chartType": "line",
          "maLineColor": "#2962FF",
          "maLineWidth": 1,
          "maLength": 9,
          "headerFontSize": "medium",
          "fontColor": "rgba(255, 255, 255, 1)",
          "gridLineColor": "rgba(255, 255, 255, 0.5)",
          "backgroundColor": "rgba(42, 46, 57, 0)",
          "widgetFontColor": "rgba(255, 255, 255, 1)",
          "lineWidth": 3,
          "lineType": 2,
          "dateRanges": [
            "1w|60",
            "1m|240",
            "3m|240",
            "12m|1D",
            "60m|1W",
            "all|1M"
          ],
          "dateFormat": "dd MMM"
        }`;
		container.current.appendChild(script);
	}, []);

	return (
		<div
			className='tradingview-widget-container'
			ref={container}>
			<div className='tradingview-widget-container__widget'></div>
			{/* <div className="tradingview-widget-copyright"><a href="https://es.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Siga los mercados en TradingView</span></a></div> */}
		</div>
	);
}

export default memo(BitcoinLineChart);
