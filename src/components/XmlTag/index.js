import React, { Component } from 'react';
import { EditableText, Button } from '@blueprintjs/core';
import './index.css';

class XmlTag extends Component {
	changeText = (value) => {
		const { changesHandler, document: { id } } = this.props;
		changesHandler({
			id,
			text: value
		})
	}

	changeAttr = (attr, value) => {
		const { changesHandler, document: { id } } = this.props;
		changesHandler({
			id,
			attributes: {
				[attr]: value
			}
		})
	}

	getAttrs = (attrs) => {
		if (!attrs) attrs = [];

		return Object.keys(attrs).map((attr) => {
			 return (
				<React.Fragment key={attr}>
					<span className='xmlTag__attrName'>
						&nbsp;{attr}=
					</span>
					<span className='xmlTag__attrValue'>
						<span className='quotes'>"</span>
						<EditableText
							minWidth='1' defaultValue={attrs[attr]}
							onConfirm={(val) => this.changeAttr(attr, val)}
							selectAllOnFocus={true}
						/>
						<span className='quotes'>"</span>
					</span>
				</React.Fragment>
			 )
		})
	}

	toogleTag = () => {
		const { document, fileId, toggleTag } = this.props;
		toggleTag(fileId, document.id);
	}

	get button() {
		const { document, closedTags} = this.props;

		if (document.text || !document.elements.length) return;

		return <Button
			className='xmlTag__caret' minimal
			icon={!closedTags.includes(document.id) ? 'caret-down' : 'caret-right'}
			onClick={this.toogleTag}
		/>
	}

	render() {
		const {
			document: { elements, attributes, name, text, id },
			changesHandler,
			toggleTag,
			closedTags,
			fileId
		} = this.props;

		return (
			<div className='xmlTag'>
				{this.button}
				<span className='xmlTag__tagName'>
					<span>{`<${name}`}</span>
					{this.getAttrs(attributes)}
					<span>></span>
				</span>
				{!elements.length
					? <EditableText
						onConfirm={this.changeText} selectAllOnFocus={true}
						minWidth='1' defaultValue={text || ''}
					/>
					: !closedTags.includes(id) && elements.map(tag =>
						<XmlTag
							closedTags={closedTags} toggleTag={toggleTag}
							key={tag.id} fileId={fileId}
							changesHandler={changesHandler}
							document={tag}
						/>
					)}
				<span className='xmlTag__tagName'>{`</${name}>`}</span>
			</div>
		)
	}
}

export default XmlTag;