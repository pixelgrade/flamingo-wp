import React, { Component } from 'react';

import firebase from 'firebase';
import { firestore, firebaseApp } from '../../firebase';

const { PanelBody } = wp.components;
const { registerBlockStyle } = wp.blocks;

class SystemList extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            systems: [],
            activeSystem: null,
            activeElement: null,
        };

        firestore.collection("systems").get().then(querySnapshot => {
            const systems = [];
            const newState = {};
            querySnapshot.forEach(doc => {
                const data = doc.data();
                systems.push(data);
            });
            if (systems.length) {
                newState.systems = systems;
                newState.activeSystem = systems[0].id;
                if (systems[0].output.length) {
                    newState.activeElement = 0;
                }
                this.setState(newState);
            }
        });

        firestore.collection("systems").onSnapshot(snapshot => {
            snapshot.docChanges().forEach(change => {
                if ( change.type === "modified" ) {
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

    updateStyleTag() {
	    const { systems } = this.state;
	    const system = systems.find(system => system.id === this.state.activeSystem);

	    if ( ! system || ! system.gutenbergCSS ) {
	        return;
        }
	    const css = system.gutenbergCSS;

	    var style = document.getElementById( "style-xy-css" ),
            oldTag = !! style;

	    if ( ! oldTag ) {
	        style = document.createElement( "style" );
		    style.setAttribute( "id", "style-xy-css" );
	    }

	    console.log(style);

        style.innerHTML = css;

	    if ( ! oldTag ) {
	        document.head.appendChild( style );
        }
    }

    handleSystemClick(event, id) {
        event.preventDefault();
        this.setState({activeSystem: id});
	    document.getElementsByName( "new_option_name" )[0].value = id;
    }

    handleElementClick(event, index) {
        this.setState({activeElement: index});
        this.props.onUpdate();
    }

    render() {
        const { systems } = this.state;
        const system = systems.find(system => system.id === this.state.activeSystem);

        // wtf
        this.updateStyleTag();

        return ( systems &&
            <React.Fragment>
                    { systems &&
                        systems.map(system => {
                            const style = system.id === this.state.activeSystem ? {fontWeight: 'bold'} : {};
                            return <div style={style} onClick={(event) => this.handleSystemClick(event, system.id)}>{system.label}</div>
                        })
                    }
            </React.Fragment> || null
        );
    }
}

export default SystemList;
