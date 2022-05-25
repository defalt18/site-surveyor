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

			const getChildlessNode = (node: Element) => {
				if (!node.hasChildNodes()) return node;
				const childlessNode = node.cloneNode(true);
				const children = childlessNode.childNodes;
				children.forEach((child) => {
					if (child.nodeType !== 3) childlessNode.removeChild(child);
				});
				return childlessNode as Element;
			};
			const allTexts = document.querySelectorAll(
				'p, h1, h2, h3, h4, h5, h6, span, button, a, pre, abbr, code, em, strong, details, summary, dl, section, div'
			);
			const TRANSPARENT_CONTAINER = 'rgba(0, 0, 0, 0)';
			allTexts.forEach((actualNode) => {
				const node = getChildlessNode(actualNode);
				const textContent = node.textContent.trim();
				const {
					display,
					visibility,
					fontSize,
					color: foreground,
				} = window.getComputedStyle(actualNode);
				const isValid =
					textContent !== '' &&
					visibility !== 'hidden' &&
					actualNode.getClientRects().length > 0 &&
					display !== 'none';
				if (isValid) {
					let background = TRANSPARENT_CONTAINER;
					let tempNode = actualNode;
					while (tempNode) {
						const color = window.getComputedStyle(tempNode).backgroundColor;
						if (color !== TRANSPARENT_CONTAINER) {
							if (color.split(',').length < 4) {
								background = color;
								break;
							}
							const alpha = parseFloat(color.split(',')[3]);
							if (alpha > 0.4) {
								background = color.split(',').slice(0, 3).join(',').replace('a', '') + ')';
								break;
							}
						}
						tempNode = tempNode.parentElement;
					}
					if (parseFloat(fontSize) < 16)
						result.metaDataText.push({
							text: textContent,
							size: `${parseFloat(parseFloat(fontSize).toFixed(2))}px`,
						});
					if (background !== TRANSPARENT_CONTAINER && background !== foreground)
						result.metaDataContrast.push({
							text: textContent,
							background,
							foreground,
							fontSize: parseFloat(parseFloat(fontSize).toFixed(2)),
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
