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

    handleSystemClick(event, id) {
        event.preventDefault();
        this.setState({activeSystem: id});
    }

    handleElementClick(event, index) {
        this.setState({activeElement: index});
        this.props.onUpdate();
    }

    render() {
        const { systems } = this.state;
        const system = systems.find(system => system.id === this.state.activeSystem);
        return ( systems &&
            <React.Fragment>
                <PanelBody title="System List" opened={true}>
                    { systems &&
                        systems.map(system => {
                            const style = system.id === this.state.activeSystem ? {fontWeight: 'bold'} : {};
                            return <div style={style} onClick={(event) => this.handleSystemClick(event, system.id)}>{system.label}</div>
                        })
                    }
                </PanelBody>
                <PanelBody title="Element List" opened={true}>
                    { system &&
                        system.output.map((element, index) => {
                            const style = {
                                fontFamily: element.fontFamily,
                                fontSize: element.fontSize,
                                lineHeight: 1.5,
                                color: element.color,
                                border: index === this.state.activeElement ? '1px solid' : 0,
                            }
                            return <div style={style} onClick={(event) => this.handleElementClick(event, index)}>{element.label}</div>
                        })
                    }
                </PanelBody>
            </React.Fragment> || null
        );
    }
}

export default SystemList;
