export const getComputedStyles = async (tabId: number) => {
	const [response] = await chrome.scripting.executeScript({
		target: { tabId },
		func: () => {
			const result: {
				metaDataText: Array<{ text: string; size: string }>;
				metaDataContrast: Array<{ text: string; foreground: string; background: string }>;
			} = { metaDataText: [], metaDataContrast: [] };
			const allTexts = document.querySelectorAll('p, h1, h2, h3, h4, h5, h6, span, div, button');
			const TRANSPARENT_CONTAINER = 'rgba(0, 0, 0, 0)';
			allTexts.forEach((node) => {
				if (node.textContent.trim() !== '') {
					const fontSize = window.getComputedStyle(node).fontSize;
					const textContent = node.textContent;
					const { x, y } = node.getBoundingClientRect();
					const allElementsOnXAndY = document.elementsFromPoint(
						x + window.scrollX,
						y + window.scrollY
					);
					let background = TRANSPARENT_CONTAINER;
					for (let index in allElementsOnXAndY) {
						const item = allElementsOnXAndY[index];
						const color = window.getComputedStyle(item).backgroundColor;
						if (color !== TRANSPARENT_CONTAINER) {
							background = color;
							break;
						}
					}
					const foreground = window.getComputedStyle(node).color;
					if (fontSize < '16px') result.metaDataText.push({ text: textContent, size: fontSize });
					if (background !== TRANSPARENT_CONTAINER)
						result.metaDataContrast.push({ text: textContent, background, foreground });
				}
			});
			return result;
		},
	});

	return response.result;
};

export function RGBToHex(rgb_string: string) {
	let sep = rgb_string.indexOf(',') > -1 ? ',' : ' ';
	let rgb = rgb_string.slice(4).split(')')[0].split(sep);

	let r = (+rgb[0]).toString(16),
		g = (+rgb[1]).toString(16),
		b = (+rgb[2]).toString(16);

	if (r.length === 1) r = '0' + r;
	if (g.length === 1) g = '0' + g;
	if (b.length === 1) b = '0' + b;

	return r + g + b;
}
