import React from 'react';
import ReactDOM from 'react-dom';
import 'whatwg-fetch';
import classNames from 'classnames/bind';

import Response from '../ajax_response/response';
import styles from './form.css';
import general from '../../general.css';
import formEl from './form_elements';

export default class Form extends React.Component {
	
	constructor(props) {
		super(props);
		/*
		*	Declaring States for Form and Response
		*/
		this.state = { 
			phonevalue	: '',
			age 		: 0,
			conditions 	: 0,
			response	: ''
		};
		// function not defined fix
		this.handlePhone = this.handlePhone.bind(this); 
		this.handleChange = this.handleChange.bind(this);
	}


	componentDidMount() {}
	/*
	*	@summary update Phone state
	*/
	handlePhone(event) {
		this.setState({
			response	: '',
			phonevalue : event.target.value
		});
	}
	/*
	*	@summary update Checkboxes state
	*/
	handleChange(key) {
		return function(e) {
			let state = {};
			state[key] = 1;
			this.setState(state);
		}.bind(this);
	};
	/*
	*	@summary Validate phone field
	*	@params event
	*/
	validatePhone = (evt) => {
	    let theEvent = evt || window.event;
	    let key = theEvent.keyCode || theEvent.which;
	    key = String.fromCharCode(key);
	    let regex = /^[0-9 ()+]+$/;
	    if (!regex.test(key)) {
	        theEvent.returnValue = false;
	        if (theEvent.preventDefault) theEvent.preventDefault();
	    }
	}
	/*
	*	@summary handling submision event of Form
	*/
	Handlesubmit = (event) => {
		event.preventDefault();
		//let phoneNumber =  ReactDOM.findDOMNode('#form__container_phone').value;
		let self = this;
		let phoneNumber = this.state.phonevalue;
		let checkbox1 = this.state.age;
		let checkbox2 = this.state.conditions;
		// double checking if checkboxs are validated
		if (checkbox1 && checkbox2) {
			console.log('validated and going to ', this.props.formAction);
			/*
			*	ajax to api
			*/
			fetch('/api/sms-promotion',  {
				method: 'POST',
				headers: {
					'Accept': 'text/plain, text/html',
					'Content-Type' 	: 	"application/json; charset=utf-8"
				},
				body: JSON.stringify({
				    phone: phoneNumber
				})
			})
			.then(function(response) {
				console.log(response.headers.get('Content-Type'))
				console.log(response.headers.get('Date'))
				console.log(response.status)
				console.log(response.statusText);
				return response.text();
			}).then(function(answer) {
				/*
				*	@summary reseting state, form and update response state
				*/
				self.setState({
					phonevalue	: '',
					age 		: 0,
					conditions 	: 0
				});
				self.setState({
					response : answer
				});
				ReactDOM.findDOMNode(self.refs.theform).reset();
			})
		} else {
			// checkboxs are NOT validated
			console.log(phoneNumber);
			console.log(checkbox1);
			console.log(checkbox2);			
		}
		return false;
	}
	
	render() {
		let formProps = this.props;
		return (
			<div>
	            <Response responseText={this.state.response}></Response>
				<form ref="theform" id={formProps.formID} className={formProps.formClass} action={formProps.formAction} method={formProps.formMethod} onSubmit={this.Handlesubmit}>
					<formEl className={general.displayf}>
						<input type="text" ref="phonevalue" name="phone" id="form__container_phone" className={styles.form__container_phone} value={this.state.phonevalue} onChange={this.handlePhone} onKeyPress={this.validatePhone} required />
				    	<button type="submit" className={styles.form__container_submit}>Submit</button>
					</formEl>
					<formEl className={classNames(styles.form__element_leftAlign, general.mt1)}>
						<input id="form__container_age" ref="age" name="form__container_age" type="checkbox" value={this.state.age} onChange={this.handleChange('age')} required />
				    	<label htmlFor="form__container_age">I am over 18</label>
					</formEl>
					<formEl className={classNames(styles.form__element_leftAlign, general.mt1)}>
						<input id="form__container_conditions" ref="conditions" name="form__container_conditions" type="checkbox" value={this.state.conditions} onChange={this.handleChange('conditions')} required />
				   		<label htmlFor="form__container_conditions">I accept the terms and conditions</label>
					</formEl>
		        </form>

		        <small className={styles.impnote}>Accepted phone FORMATES: +852 6569-8900, (817) 569-8900, +85265698900, +90(533) 856-4166</small>
		        <small className={styles.impnote}>For now this form is sending message to my Verified twilio number i.e +90 533 856 41 66 because of trial based account.</small>
			</div>
		);
	}
}