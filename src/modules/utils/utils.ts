export const getComputedStyles = async (tabId: number) => {
	const [response] = await chrome.scripting.executeScript({
		target: { tabId },
		func: () => {
			const result: {
				metaDataText: Array<{ text: string; size: string }>;
				metaDataContrast: Array<{
					text: string;
					foreground: string;
					background: string;
					fontSize: number;
				}>;
			} = { metaDataText: [], metaDataContrast: [] };
			const allTexts = document.querySelectorAll(
				'p, h1, h2, h3, h4, h5, h6, span, button, a, pre, abbr, code, em, strong, details, summary'
			);
			const TRANSPARENT_CONTAINER = 'rgba(0, 0, 0, 0)';
			allTexts.forEach((node) => {
				if (node.textContent.trim() !== '') {
					const fontSize = window.getComputedStyle(node).fontSize;
					const textContent = node.textContent;
					const { left: x, top: y } = node.getBoundingClientRect();
					const allElementsOnXAndY = document.elementsFromPoint(x, y);
					const foreground = window.getComputedStyle(node).color;
					const itemBackground = window.getComputedStyle(node).backgroundColor;
					let background = TRANSPARENT_CONTAINER;
					if (itemBackground !== TRANSPARENT_CONTAINER) background = itemBackground;
					else {
						for (let index in allElementsOnXAndY) {
							const item = allElementsOnXAndY[index];
							const color = window.getComputedStyle(item).backgroundColor;
							if (color !== TRANSPARENT_CONTAINER && color.split(',').length < 4) {
								background = color;
								break;
							}
						}
					}
					if (fontSize < '16px') result.metaDataText.push({ text: textContent, size: fontSize });
					if (background !== TRANSPARENT_CONTAINER)
						result.metaDataContrast.push({
							text: textContent,
							background,
							foreground,
							fontSize: parseInt(fontSize.slice(0, fontSize.length - 2)),
						});
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

	return '#' + r + g + b;
}

export function rgbaToHex(rgba_string: string) {
	let rgba = rgba_string.match(
		/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i
	);
	return rgba && rgba.length === 4
		? '#' +
				('0' + parseInt(rgba[1], 10).toString(16)).slice(-2) +
				('0' + parseInt(rgba[2], 10).toString(16)).slice(-2) +
				('0' + parseInt(rgba[3], 10).toString(16)).slice(-2)
		: '';
}
