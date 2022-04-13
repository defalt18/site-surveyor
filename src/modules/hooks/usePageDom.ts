import React from 'react';
import { isUndefined } from 'lodash';

export default function usePageDom(deps: Array<any> = []) {
	const [dom, setDom] = React.useState<Document | undefined>();

	const getPageDOM = () => {
		chrome.tabs.query({ active: true }, async ([tab]) => {
			const tabId = tab.id;
			const [response] = await chrome.scripting.executeScript({
				target: { tabId },
				func: () => ({ dom: document.body.innerHTML }),
			});
			const parser = new DOMParser();
			const document = parser.parseFromString(response.result.dom, 'text/html');
			setDom(document);
		});
	};

	React.useEffect(() => {
		getPageDOM();
	}, deps);

	return { loading: isUndefined(dom), dom };
}
