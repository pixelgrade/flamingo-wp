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

        style.innerHTML = css;

	    if ( ! oldTag ) {
	        document.head.appendChild( style );
        }
    }

    handleSystemClick(event, system) {
        event.preventDefault();
        this.setState({activeSystem: system.id});
	    document.getElementsByName( "new_option_name" )[0].value = system.id;
	    document.getElementsByName( "some_other_option" )[0].value = system.published.css;
	    document.getElementsByName( "option_etc" )[0].value = system.published.gutenbergCSS;
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
                <h2>Design Systems List</h2>
                { systems.map(system => {
                    const className = system.id === this.state.activeSystem ? 'active' : '';
	                const style = system.id === this.state.activeSystem ? {fontWeight: 'bold'} : {};

	                return (
                        <div className={className} style={style} onClick={(event) => this.handleSystemClick(event, system)}>
                            {system.published.label}
                        </div>
                    )
                }) }
            </React.Fragment> || null
        );
    }
}

export default SystemList;
