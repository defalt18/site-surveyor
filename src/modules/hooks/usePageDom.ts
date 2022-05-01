import React from 'react';
import { isUndefined } from 'lodash';

export default function usePageDom(deps: React.DependencyList = []) {
	const [dom, setDom] = React.useState<{ dom: Document; tabId: number; otherAttribs: any }>();

	const getPageDOM = () => {
		chrome.tabs.query({ active: true }, async ([tab]) => {
			const tabId = tab.id;
			const [response] = await chrome.scripting.executeScript({
				target: { tabId },
				func: () => ({
					dom: document.documentElement.innerHTML,
					otherAttribs: { lang: document.querySelectorAll('html')[0].lang },
				}),
			});
			const parser = new DOMParser();
			const document = parser.parseFromString(response.result.dom, 'text/html');
			setDom({ dom: document, tabId, otherAttribs: response.result.otherAttribs });
		});
	};

	React.useEffect(() => {
		getPageDOM();
	}, deps);

	return { loading: isUndefined(dom), ...dom };
}
