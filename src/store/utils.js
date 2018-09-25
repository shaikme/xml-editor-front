import { OrderedMap } from 'immutable';

export const arrToMap = (arr, ItemRecord) => {
	return arr.reduce(
		(acc, item) => acc.set(item.id, ItemRecord ? new ItemRecord(item) : item),
		new OrderedMap({})
	)
};


export const updateDocument = (document, changedNode) => {
	const docCopy = JSON.parse(JSON.stringify(document));

	changedNode.forEach(node => {
		const nodeById = traverse(docCopy, node);

		if (nodeById) {
			if (node.hasOwnProperty('text')) nodeById.text = node.text;

			if (node.attributes) {
				nodeById.attributes = {
					...nodeById.attributes,
					...node.attributes
				}
			}
		}
	})

	return docCopy;
}

export const traverse = (document, id) => {
	let queue = [document];

	while (queue.length > 0){
		const tempNode = queue.shift();

		if (tempNode.id === id) return tempNode;

		if (tempNode.elements.length) {
			queue = queue.concat(tempNode.elements);
		}
	}

	return null;
}
