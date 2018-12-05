import React, {Component} from 'react';
import SystemList from "../system-list";
import LogIn from "../log-in";

class SystemPicker extends Component {
	render() {
		return (
			<React.Fragment>
				<h1>Tadaaa!!!</h1>
				<LogIn />
				<SystemList />
			</React.Fragment>
		);
	}
}

export default SystemPicker;