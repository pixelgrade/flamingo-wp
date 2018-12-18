import React, { Component } from 'react';

import Login from './Login';
import { firestore } from '../firebase';
import firebase from 'firebase';
import axios from 'axios';

import '../scss/style.scss';

class SystemList extends Component {

	constructor() {
		super();

		this.state = {
			systems: [],
			activeSystem: window.scriptParams.flamingo_system_id,
		}
	}

	componentDidMount() {
		this.fetchSystems();
	}

	fetchSystems() {
		const user = firebase.auth().currentUser;
		const systems = firestore.collection("systems").where('owner', '==', user.uid);
		systems.get().then(querySnapshot => {
			const systems = [];

			querySnapshot.forEach(doc => {
				const data = doc.data();
				systems.push( data );
			});

			if ( systems.length ) {
				this.setState({ systems });
			}
		});

		systems.onSnapshot(this.onSnapshot);
	}

	onSnapshot(snapshot) {
		snapshot.docChanges().forEach(change => {
			if (change.type === "modified") {
				const systems = this.state.systems.slice();
				const index = systems.findIndex(system => system.id === change.doc.id);

				if (index) {
					systems[index] = change.doc.data();
					this.setState({systems});
				}
			}
		});
	}

	handleSystemClick(event, system) {
		event.preventDefault();
		this.setState({activeSystem: system.id});
	}

	submit() {
        const { ajaxurl } = window.scriptParams;

        const system = this.state.systems.find(system => {
        	return system.id === this.state.activeSystem
        });

        if ( system ) {
	        var data = new FormData();
	        data.append( 'action', 'flamingo_save_system' );
	        data.append( 'id', system.id );
	        data.append( 'css', system.published.css );
	        axios.post( ajaxurl, data ).then(function() {
	        	alert('ura');
	        });
        }
	}

	signOut() {
		firebase.auth().signOut();
	}

	renderChoice(system) {
		const className = system.id === this.state.activeSystem ? 'active' : '';

        let title = system.published.elements.find(element => element.id === 'main-heading');
        let description = system.published.elements.find(element => element.id === 'paragraph');

		return <div key={system.id}
		            className={className}
		            onClick={(event) => this.handleSystemClick(event, system)}>
			<h2 style={title.css}>{system.published.label}</h2>
			<p style={description.css}>{system.published.description}</p>
		</div>
	}

	render() {
		return (
			<React.Fragment>
				<h2>Design Systems</h2>
				<div className="flamingo-system-list">
					{this.state.systems.map(system => this.renderChoice(system))}
				</div>
				<button onClick={this.submit.bind(this)}>Submit</button>
				<button onClick={this.signOut}>Log Out</button>
			</React.Fragment>
		)
	}
}

class SystemPicker extends Component {

	constructor() {
		super();

		this.token = window.scriptParams.flamingo_token;

		this.state = {
			authed: false,
		};

		if ( this.token ) {
			firebase.auth().signInWithCustomToken(this.token).catch(function(error) {
			});
		}

        this.removeListener = firebase.auth().onAuthStateChanged((user) => {
            this.setState({
                authed: !! user,
            })
        });
	}

    componentWillUnmount () {
        this.removeListener()
    }

	render() {
		if ( ! this.state.authed ) {
			return <Login />
		} else {
			return <SystemList />
		}
	}
}

export default SystemPicker;
