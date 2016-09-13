const React = require('react');
const Link = require('react-router').Link;
const ReactRouter = require('react-router');
const hashHistory = ReactRouter.hashHistory;
const SessionActions = require('../actions/session_actions');
const SessionStore = require('../stores/session_store');
const ErrorStore = require('../stores/error_store');
const App = require('./app');
const Button = require('react-bootstrap').Button;

const SignUpForm = React.createClass({

	contextTypes: {
		router: React.PropTypes.object.isRequired
	},

  getInitialState() {
    return({ username: "", password: "" });
  },

  componentDidMount() {
		this.errorListener = ErrorStore.addListener(this.forceUpdate.bind(this));
    this.sessionListener = SessionStore.addListener(this._handleNewUser);
  },

	_handleNewUser() {
		this.props.cb();
		hashHistory.push('/stories');
	},

  componentWillUnmount() {
		this.errorListener.remove();
    this.sessionListener.remove();
  },

  _signup(e) {
    e.preventDefault();
    if (SessionActions.signUp(this.state)) {
			this._redirectToHome();
		}
  },

  update(property){
    return (e) => this.setState({ [property]: e.target.value });
  },

	_redirectToHome() {
		hashHistory.push('/stories');
	},

	_guest(e) {
		e.preventDefault();
		SessionActions.logIn({username: "Guest", password: "Password"});
		this._redirectToHome();
	},

	fieldErrors(field) {
		const errors = ErrorStore.formErrors("signup");

		if (!errors[field]) { return; }

		const messages = errors[field].map( (errorMsg, i) => {
			return <li className="error-msg-items"
								key={ i }>{ errorMsg }</li>;
		});

		return <ul className="error-msgs">{ messages }</ul>;
	},

	_redirectToLoginModal() {
		App.onModalClose();
		App._handleClick.bind(this, true);
	},

  render() {
		return (
			<div className="login-form-container">
				<form className="login-form-box">
					<b>Create an account</b>
					<br/>
					<br/>
	        Welcome to <span className="sideline-title">SIDELINE!</span>
					<br/>
					Please Sign Up.

					<div className="login-form">
		        <br />
						<label className="form-username"> Username
							<input type="text"
		            value={this.state.username}
		            onChange={this.update("username")}
								className="login-input"
								placeholder="Username"/>
						</label>

		        <br />
						<label className="form-username"> Password
		          <input type="password"
		            value={this.state.password}
		            onChange={this.update("password")}
								className="login-input"
								placeholder="Password"/>
						</label>

		        <br/>

						{ this.fieldErrors("username") }
						{ this.fieldErrors("password") }
						{ this.fieldErrors("base") }

						<a onClick={this.props.modal}>
								Already have an account?</a>

							<Button type="submit"
											value="Sign Up"
											onClick={this._signup}
											className="login-button hvr-glow">
											Sign Up
							</Button>

						<Button className="guest-login hvr-glow"
										onClick={this._guest}>
										Demo Login
						</Button>

					</div>
				</form>
			</div>
    );
  }
});

module.exports = SignUpForm;
