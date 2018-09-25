import React, { Component } from 'react';
import { Route, withRouter, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { Toast, Intent } from '@blueprintjs/core';
import NavPanel from '../NavPanel';
import XmlFile from '../XmlFile';
import DefaultScreen from '../DefaultScreen';
import AppLoader from '../../decorators/AppLoader';
import { clearError, getFileList } from '../../ac';
import './index.css';

class App extends Component {
	get message() {
		const { error, clearWarning } = this.props

		if (!error) return;

		return (
			<Toast
				onDismiss={clearWarning}
				className='app_overlayMessage'
				icon='warning-sign' intent={Intent.DANGER}
				message={error}
			/>
		)
	}

	render() {
		const { location: { pathname } } = this.props;

		return (
			<div className='app'>
				<div className='app__navpanel bp3-dark'>
					<NavPanel currentPath={pathname}/>
				</div>
				<div className='app__content'>
					{this.message}
					<Switch>
						<Route path='/xml/:id' exact component={XmlFile} />
						<Route path='*' exact component={DefaultScreen} />
					</Switch>
				</div>
			</div>
		)
	}
}

export default withRouter(connect(
	(state) => ({
		error: state.error,
		loading: state.fileList.loading,
		loaded: state.fileList.loaded
	}),
	{
		fetch: getFileList,
		clearWarning: clearError
	}
)(AppLoader(App)));