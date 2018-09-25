import React, { Component } from 'react';
import { Spinner, Intent } from '@blueprintjs/core';

export default (OriginalComponent) => class AppLoader extends Component {
	componentDidMount() {
		const { fetch, loaded } = this.props;

		!loaded && fetch();
	}

	get spinner() {
		return <Spinner className='app__spinner' size={100} intent={Intent.PRIMARY}/>
	}

	render() {
		const { loaded, loading } = this.props;

		if (!loaded || loading) return this.spinner;

		return <OriginalComponent {...this.props}/>
	}
}