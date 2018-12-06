import React, { Component } from 'react';

import { firestore, firebaseApp } from '../firebase';

class CSSOutput extends Component {

	constructor(props) {
		super(props);

		this.state = {
			css: '',
		};

		const docRef = firestore.collection("systems").doc(props.system);

		docRef.get().then(doc => {
			const data = doc.data();
			this.setState({ css: data.draft.css });
		});

		docRef.onSnapshot(doc => {
			const data = doc.data();
			this.setState({ css: data.draft.css });
		});
	}

	render() {
		return <style>{this.state.css}</style>;
	}
}

export default CSSOutput;
