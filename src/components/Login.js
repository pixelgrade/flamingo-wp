import React, { Component } from 'react';
import axios from 'axios';
import firebase from 'firebase';

class Login extends Component {

    constructor() {
        super();
        this.myEmail = React.createRef();
        this.myPassword = React.createRef();
    }

    attemptLogin(event) {
        event.preventDefault();
        const email = this.myEmail.current.value;
        const password = this.myPassword.current.value;

        axios.post('https://useflamingo.com/api/v1/token', {
            username: email,
            password: password
        })
        .then(function(response) {
            const { ajaxurl } = window.scriptParams;
            var data = new FormData();
            data.append( 'action', 'flamingo_save_token' );
            data.append( 'token', response.data );
            axios.post( ajaxurl, data ).then(function() {
                firebase.auth().signInWithCustomToken(response.data).catch(function(error) {
                });
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    render() {
        return (
            <form action="" className="register-form" onSubmit={this.attemptLogin.bind(this)}>
                <h2>Log In</h2>
                <div><input type="text" ref={this.myEmail} required /></div>
                <div><input type="password" ref={this.myPassword} required /></div>
                <button type="submit">Log in</button>
            </form>
        );
    }
}

export default Login;
