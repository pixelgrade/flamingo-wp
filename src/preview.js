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
	const status = output.getAttribute('data-status') || 'draft';
    const systemId = window.scriptParams.flamingo_system_id;
	ReactDOM.render(
		<CSSOutput system={systemId} status={status} />,
		output
	);
}
