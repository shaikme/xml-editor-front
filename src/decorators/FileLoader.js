import React, { Component } from 'react';
import { Spinner, Intent } from '@blueprintjs/core';
import NotFound from '../components/NotFound';

export default (OriginalComponent) => class FileLoader extends Component {
	componentDidMount() {
		const { fetch, loaded, id, notFound } = this.props;

		!notFound && !loaded && fetch(id);
	}

	componentDidUpdate() {
		const { fetch, loaded, loading, id, notFound } = this.props;

		!notFound && !loaded && !loading && fetch(id);
	}

	get spinner() {
		return <Spinner className='app__spinner' size={80} intent={Intent.PRIMARY}/>
	}

	render() {
		const { loaded, loading, notFound } = this.props;

		if (notFound) return <NotFound />

		if (!loaded || loading) return this.spinner;

		return <OriginalComponent {...this.props}/>
	}
}