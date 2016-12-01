import React from 'react';

export default class Response extends React.Component {

	render() {
		return (
			<header id="response"><h1>{this.props.responseText}</h1></header>
		);
	}
}