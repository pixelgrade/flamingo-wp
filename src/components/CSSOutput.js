import React, { Component } from 'react';
import firebase from 'firebase';

class CSSOutput extends Component {

	constructor(props) {
		super(props);

		this.state = {
			css: '',
		};

        this.removeListener = firebase.auth().onAuthStateChanged(user => {
			if ( user ) {
				const docRef = firebase.firestore().collection("systems").doc(props.system);

				docRef.get().then(this.updateStateFromDoc.bind(this));
				docRef.onSnapshot(this.updateStateFromDoc.bind(this));
			}
        });
	}

	updateStateFromDoc(doc) {
		const data = doc.data();
		const status = this.props.status === 'published' ? 'published' : 'draft';
		this.setState({ css: data[status].css });
	}

	render() {
		return this.state.css;
	}
}

export default CSSOutput;
