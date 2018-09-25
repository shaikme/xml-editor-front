import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Menu, FileInput, Spinner, Intent, Button } from '@blueprintjs/core';
import { uploadXml } from '../../ac';
import './index.css';

class NavPanel extends Component {
	uploadingHandler = (e) => {
		const formData = new FormData();
		formData.append('xml',e.target.files[0]);
		this.props.upload(formData);
	}

	get spinner() {
		return <Spinner size={60} intent={Intent.PRIMARY}/>
	}

	get fileList() {
		const { items, currentPath } = this.props;

		return items.map(item => {
			const linkPath = `/xml/${item.id}`;

			return (
				<NavLink key={item.id} to={linkPath}>
					<Button
						fill minimal
						alignText={'left'}
						text={item.name}
						active={linkPath === currentPath}/>
				</NavLink>
			)
		})
	}

	get fileInput() {
		if (this.props.uploading) {
			return this.spinner;
		}

		return 	<FileInput className='navPanel__upload' text='.xml' fill onInputChange={this.uploadingHandler}/>;
	}

	render() {
		return (
			<Menu large className='navPanel'>
				<Menu.Divider title='Загрузить файл' />
				{this.fileInput}
				<Menu.Divider title='Текущие файлы' />
				{this.fileList}
			</Menu>
		);
	}
}

export default connect(
	(state) => ({
		uploading: state.fileList.uploading,
		items: state.fileList.items
	}),
	{
		upload: uploadXml
	}
)(NavPanel);