/** @format */

// BitcoinChart.jsx
import React, { useEffect, useRef, memo } from 'react';

function BitcoinChart() {
	const container = useRef();

	useEffect(() => {
		const script = document.createElement('script');
		script.src =
			'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
		script.type = 'text/javascript';
		script.async = true;
		script.innerHTML = `
        {
          "autosize": true,
          "symbol": "BITSTAMP:BTCUSD",
          "interval": "240",
          "timezone": "America/Mexico_City",
          "theme": "dark",
          "style": "1",
          "locale": "es",
          "backgroundColor": "rgba(60, 60, 60, 1)",
          "gridColor": "rgba(255, 255, 255, 0.5)",
          "hide_top_toolbar": true,
          "allow_symbol_change": true,
          "save_image": false,
          "calendar": false,
          "hide_volume": true,
          "support_host": "https://www.tradingview.com"
        }`;
		container.current.appendChild(script);
	}, []);

	return (
		<div
			className='tradingview-widget-container'
			ref={container}
			style={{ height: '100%', width: '100%' }}>
			<div
				className='tradingview-widget-container__widget'
				style={{ height: 'calc(100% - 32px)', width: '100%' }}></div>
			{/* <div className="tradingview-widget-copyright"><a href="https://es.tradingview.com/" rel="noopener nofollow" target="_blank"><span className="blue-text">Siga los mercados en TradingView</span></a></div> */}
		</div>
	);
}

export default memo(BitcoinChart);
