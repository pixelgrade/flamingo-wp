import React, { Component } from 'react';

import { firestore, firebaseApp } from '../firebase';

class CSSOutput extends Component {

	constructor(props) {
		super(props);

		this.state = {
			css: '',
		};

		const docRef = firestore.collection("systems").doc(props.system);
		const status = props.status === 'published' ? 'published' : 'draft';

		const updateStateFromDoc = doc => {
			const data = doc.data();
			this.setState({ css: data[status].css });
		}

		docRef.get().then(updateStateFromDoc);
		docRef.onSnapshot(updateStateFromDoc);
	}

	render() {
		return <style>{this.state.css}</style>;
	}
}

export default CSSOutput;
