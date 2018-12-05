import React, { Component } from 'react';
import firebase from 'firebase';

class LogIn extends Component {

	constructor(props) {
		super(props);
		this.myEmail = React.createRef();
		this.myPassword = React.createRef();
	}

	attemptLogin(event) {
		event.preventDefault();
		const email = this.myEmail.current.value;
		const password = this.myPassword.current.value;
		firebase.auth().signInWithEmailAndPassword(email, password)
	        .then(() => {
	        	debugger;
		        firebase.auth().createCustomToken(uid).then(function(customToken) {
			        console.log(customToken);
		        }).catch(error => {
		        	console.log(error);
		        })
	        })
	        .catch(error => {

	        });
	}

	render() {
		return (
			<div className="login">
				<form action="" className="register-form" onSubmit={this.attemptLogin.bind(this)}>
					<h2>Log In</h2>
					<div><input type="text" ref={this.myEmail} required /></div>
					<div><input type="password" ref={this.myPassword} required /></div>
					<button type="submit">Log in</button>
				</form>
			</div>
		);
	}
}

export default LogIn;