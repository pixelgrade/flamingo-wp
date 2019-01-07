import React, { Component } from 'react';
import axios from 'axios';
import firebase from 'firebase';

import SystemPicker from './SystemPicker';

class Login extends Component {

    constructor() {
        super();
        this.myEmail = React.createRef();
        this.myPassword = React.createRef();

        this.state = {
            authed: false,
            loading: true
        };

        this.removeListener = firebase.auth().onAuthStateChanged(user => {
            this.setState({ authed: !! user });
        });
    }

    componentWillMount() {
        const refresh_token = window.scriptParams.flamingo_refresh_token;
        if ( refresh_token ) {
            this.getNewAccessToken(refresh_token)
            .then(access_token => {
                return axios.post('https://useflamingo.com/api/v1/refresh_token', {
                    id_token: access_token
                })
            })
            .then(response => {
                return firebase.auth().signInWithCustomToken(response.data);
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    attemptLogin(event) {
        event.preventDefault();
        const email = this.myEmail.current.value;
        const password = this.myPassword.current.value;

        axios.post('https://useflamingo.com/api/v1/token', {
            username: email,
            password: password
        })
        .then(response => {
            const { ajaxurl } = window.scriptParams;
            const custom_token = response.data;
            return firebase.auth().signInWithCustomToken(custom_token).then(function(currentUser) {
                const data = new FormData();
                const refresh_token = firebase.auth().currentUser.refreshToken;
                data.append( 'action', 'flamingo_save_tokens' );
                data.append( 'refresh_token', refresh_token );
                data.append( 'custom_token', custom_token );
                return axios.post( ajaxurl, data )
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getNewAccessToken(refresh_token) {
        return axios.post('https://securetoken.googleapis.com/v1/token?key=AIzaSyBYDjKxj9eHNyAvUKHu47frMrR9xsjfv7U', {
            grant_type: 'refresh_token',
            refresh_token: refresh_token
        })
        .then(response => {
            return Promise.resolve(response.data.access_token);
        })
    }

    signOut() {
        const { ajaxurl } = window.scriptParams;
        const data = new FormData();
        data.append( 'action', 'flamingo_delete_tokens' );
        return axios.post( ajaxurl, data ).then(() => {
            firebase.auth().signOut();
        });
    }

    render() {
        return (
            this.state.authed
            ? <React.Fragment>
                <SystemPicker />
                <button onClick={this.signOut.bind(this)}>Log Out</button>
            </React.Fragment>
            : <form action="" className="register-form" onSubmit={this.attemptLogin.bind(this)}>
                <h2>Log In</h2>
                <div><input type="text" ref={this.myEmail} required /></div>
                <div><input type="password" ref={this.myPassword} required /></div>
                <button type="submit">Log in</button>
            </form>
        );
    }
}

export default Login;
