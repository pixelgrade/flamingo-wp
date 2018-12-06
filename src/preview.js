import React from 'react';
import ReactDOM from 'react-dom';

import SystemPicker from './components/SystemPicker';
import CSSOutput from './components/CSSOutput';

var picker = document.getElementById('flamingo-system-picker');
var output = document.getElementById('flamingo-css-output');

if ( picker ) {
	ReactDOM.render(
		<SystemPicker />,
		picker
	);
}

if ( output ) {
	const status = output.getAttribute('data-status') || 'draft'
	ReactDOM.render(
		<CSSOutput system="876dfe31-4684-4ec5-bd7c-cd05d0e3b30a" status={status} />,
		output
	);
}
