import React from 'react';
import { isUndefined } from 'lodash';

export default function usePageDom(deps: React.DependencyList = []) {
	const [dom, setDom] = React.useState<{ dom: Document; tabId: number }>();

	const getPageDOM = () => {
		chrome.tabs.query({ active: true }, async ([tab]) => {
			const tabId = tab.id;
			const [response] = await chrome.scripting.executeScript({
				target: { tabId },
				func: () => ({ dom: document.body.innerHTML }),
			});
			const parser = new DOMParser();
			const document = parser.parseFromString(response.result.dom, 'text/html');
			setDom({ dom: document, tabId });
		});
	};

	React.useEffect(() => {
		getPageDOM();
	}, deps);

	return { loading: isUndefined(dom), ...dom };
}
