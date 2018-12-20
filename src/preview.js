import React from 'react';
import ReactDOM from 'react-dom';

import Login from './components/Login';
import CSSOutput from './components/CSSOutput';

import { firebaseApp } from './firebase';

const picker = document.getElementById('flamingo-system-picker');
const output = document.getElementById('flamingo-preview-css');

if ( picker ) {
	ReactDOM.render(
		<Login />,
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
