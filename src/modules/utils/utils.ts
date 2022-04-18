export const getComputedStyles = async (tabId: number) => {
	const [response] = await chrome.scripting.executeScript({
		target: { tabId },
		func: () => {
			const result: Array<{ text: string; size: string }> = [];
			const allTexts = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span');
			allTexts.forEach((node) => {
				if (node.textContent.trim() !== '') {
					const fontSize = window.getComputedStyle(node).fontSize;
					const textContent = node.textContent;
					if (fontSize < '16px') result.push({ text: textContent, size: fontSize });
				}
			});
			return result;
		},
	});

	return response.result;
};
