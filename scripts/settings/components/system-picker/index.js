import SystemList from "../system-list";
import LogIn from "../log-in";

class SystemPicker extends React.Component {
	render() {
		return (
			<React.Fragment>
				<LogIn />
				<SystemList />
			</React.Fragment>
		);
	}
}

export default SystemPicker;