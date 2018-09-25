import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Intent } from '@blueprintjs/core';
import FileLoader from '../../decorators/FileLoader';
import XmlTag from '../XmlTag';
import { getXml, editXml, toggleTag } from '../../ac';
import './index.css';

class XmlFile extends Component {
	state = {
		changedNode: []
	}

	saveChanges = () => {
		const { upload, id } = this.props;
		const accumulateChanges = {};

		this.state.changedNode.forEach(node => {
			const nodeById = accumulateChanges[node.id];

			if (nodeById) {
				if (node.hasOwnProperty('text'))
					return nodeById.text = node.text;

				const attributes = {
					...nodeById.attributes,
					...node.attributes
				}

				return nodeById.attributes = attributes;
			}

			accumulateChanges[node.id] = node;
		})

		upload(id, Object.values(accumulateChanges));
		this.setState({ changedNode: [] });
	}

	changesHandler = (node) => {
		const { changedNode } = this.state;

		this.setState({
			changedNode: changedNode.concat([node])
		})
	}

	get file() {
		const { body, closedTags, id, toggleTag } = this.props;

		return <XmlTag
			toggleTag={toggleTag}
			fileId={id} closedTags={closedTags}
			changesHandler={this.changesHandler}
			document={body.elements[0]}
		/>;
	}

	render() {
		const { changedNode } = this.state;
		const { uploading, loaded } = this.props;

		return (
			<div className='xmlFile'>
				<div className='xmlFile__butons bp3-dark'>
					<Button
						large icon='saved' loading={uploading}
						disabled={!changedNode.length || !loaded}
						text='сохранить' intent={Intent.PRIMARY}
						onClick={this.saveChanges}
					/>
					<a download href={`https://xml-server.herokuapp.com/xml/downoload/${this.props.id}`}>
						<Button disabled={!loaded} fill large icon='import' text='скачать' intent={Intent.SUCCESS}/>
					</a>
				</div>
				{this.file}
			</div>
		);
	}
}

export default connect(
	(state, ownProps) => {
		const document = state.files.get(ownProps.match.params.id);

		if (!document) return {
			notFound: true
		}

		return document.toJS();
	},
	{
		fetch: getXml,
		upload: editXml,
		toggleTag
	}
)(FileLoader(XmlFile));