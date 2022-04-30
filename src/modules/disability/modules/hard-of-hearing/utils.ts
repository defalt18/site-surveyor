import { isEmpty, reduce } from 'lodash';

const getAllTextNodes = (document: Document) => {
	let n: Node,
		allTextNodes = [],
		walk = document.createTreeWalker(document.documentElement, NodeFilter.SHOW_TEXT, null);
	while ((n = walk.nextNode())) allTextNodes.push(n);
	return allTextNodes;
};

const isValidPhone = (text: string) => {
	const trimmedText = text.trim();
	const regex = /^\+?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
	return trimmedText.match(regex);
};

export const getAllContactNumbers = (dom: Document) => {
	const allTextNodes = getAllTextNodes(dom);
	const contacts = reduce(
		allTextNodes,
		(res, node) => {
			if (isValidPhone(node.textContent))
				return [...res, { records: [{ key: 'Phone', value: node.textContent }] }];
			return res;
		},
		[]
	);
	return { type: isEmpty(contacts) ? 'success' : 'warning', errors: contacts };
};
