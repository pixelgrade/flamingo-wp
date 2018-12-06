import React, { Component } from 'react';

import { firestore } from '../firebase';

class SystemPicker extends Component {

	constructor() {
		super();

		this.state = {
			systems: [],
			activeSystem: null,
		};

		firestore.collection("systems").get().then(querySnapshot => {
			const systems = [];

			querySnapshot.forEach(doc => {
				const data = doc.data();
				systems.push( data );
			});

			if ( systems.length ) {
				this.setState({ systems });
			}
		});

		firestore.collection("systems").onSnapshot(snapshot => {
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
		});
	}

	handleSystemClick(event, system) {
		event.preventDefault();

		this.setState({activeSystem: system.id});
	}

	renderChoice(system) {
		const className = system.id === this.state.activeSystem ? 'active' : '';
		const style = {
			color: system.id === this.state.activeSystem ? '#222' : '#888'
		}

		return <div key={system.id}
		            className={className}
		            style={style}
		            onClick={(event) => this.handleSystemClick(event, system)}>
			<h2>{system.published.label}</h2>
			<p>{system.published.description}</p>
		</div>
	}

	render() {
		return this.state.systems &&
			<React.Fragment>
				<h2>Design Systems</h2>
				{this.state.systems.map(system => this.renderChoice(system))}
				<button onClick={this.submit}>Submit</button>
			</React.Fragment>
	}
}

export default SystemPicker;
