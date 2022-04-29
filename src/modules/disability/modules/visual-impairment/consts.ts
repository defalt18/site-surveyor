import { AnalysisErrors, LayoutContainerProps } from '../../../../molecules/feature-layout/types';
import { ErrorRenderer } from '../../../utils/renderers';
import { filter, isEmpty, size, map, startsWith, reduce, result } from 'lodash';
import { getComputedStyles, rgbaToHex, RGBToHex } from '../../../utils/utils';
//@ts-ignore
import ColorContrastChecker from 'color-contrast-checker';

import {
	TextSVGIcon,
	AudioIcon,
	ContrastIcon,
	PhotographIcon,
	VideoIcon,
	StructureIcon,
	SVGIcon,
} from '../../../../assets/icons';
import ContrastErrorRenderer from './renderers';

const getVideoErrors = (videoNodes: NodeListOf<HTMLVideoElement>) => {
	const concernedVideoNodes = filter(videoNodes, (video) => !isEmpty(video.src));
	const subWarnings = map(concernedVideoNodes, (videoNode) => ({
		records: [
			{ key: 'Source src', value: `"${videoNode.src}"`, meta: 'link' },
			{ key: 'Track', value: 'empty' },
		],
	}));
	const subErrors = reduce(
		videoNodes,
		(acc, node) => {
			const validNodesWithTitle = filter(node.childNodes, { localName: 'title' });
			const validNodesWithTrack = filter(node.childNodes, { localName: 'track' });
			if (isEmpty(validNodesWithTitle)) {
				const [titleErrors] = acc;
				acc[0] = [
					...titleErrors,
					{
						records: [
							{ key: 'Source src', value: node.src, meta: 'link' },
							{ key: 'Accessible Name', value: 'empty' },
						],
					},
				];
			}

			if (isEmpty(validNodesWithTrack)) {
				const [, trackErrors] = acc;
				acc[1] = [
					...trackErrors,
					{
						records: [
							{ key: 'Source src', value: node.src, meta: 'link' },
							{ key: 'Track', value: 'empty' },
						],
					},
				];
			}

			return acc;
		},
		[[], []]
	);

	const errors = reduce(
		[subWarnings, subErrors[0], subErrors[1]],
		(res, item, index) => {
			if (index === 0) {
				if (!isEmpty(item))
					return [
						...res,
						{
							title: 'Provide synchronized audio descriptions for videos',
							errorType: 'warning',
							tags: [
								{ name: '1.2.1', color: 'bg-orange-primary' },
								{ name: 'Level A', color: 'bg-orange-primary' },
							],
							subErrorCount: size(subWarnings),
							subErrors: subWarnings,
							tips: [
								{
									description:
										'Provide a text transcript that conveys the same information as video-only media or Provide an audio-track that conveys the same information as video-only media.',
								},
							],
						},
					];
			}
			if (index === 1) {
				if (!isEmpty(item)) {
					return [
						...res,
						{
							title: 'Absence of accessible name for video',
							errorType: 'error',
							tags: [
								{ name: '1.1.1', color: 'bg-orange-primary' },
								{ name: 'Level A', color: 'bg-orange-primary' },
							],
							subErrorCount: size(item),
							subErrors: item,
							tips: [
								{
									description:
										'A <title> tag that briefly describes the video or gives its title is provided so that users know what it is when they encounter it and can decide what action if any they want to take with it. ',
								},
							],
						},
					];
				}
			}
			if (index === 2) {
				if (!isEmpty(item)) {
					return [
						...res,
						{
							title: 'Absence of child <track> in <video> tag',
							errorType: 'error',
							tags: [
								{ name: '1.2.1', color: 'bg-orange-primary' },
								{ name: 'Level A', color: 'bg-orange-primary' },
							],
							subErrorCount: size(item),
							subErrors: item,
						},
					];
				}
			}

			return res;
		},
		[]
	);

	return {
		errors,
		type:
			size(subErrors[0]) > 0 || size(subErrors[1])
				? 'error'
				: size(subWarnings) > 0
				? 'warning'
				: 'success',
	};
};

export const ModuleSpecification: LayoutContainerProps = {
	title: 'Vision Impairment',
	description:
		'World Health Organization (WHO) estimates that there are 246 million people worldwide who have low vision and 39 million people are blind, indicating that 86% of the people with visual impairments have low vision.',
	errorRenderer: ErrorRenderer,
	checkpoints: [
		{
			name: 'Images',
			icon: PhotographIcon,
			tags: [{ name: 'WCAG', color: 'bg-muave-secondary' }],
		},
		{
			name: 'Contrast',
			tags: [{ name: 'WCAG', color: 'bg-muave-secondary' }],
			icon: ContrastIcon,
			errorRenderer: ContrastErrorRenderer,
		},
		{
			name: 'Text',
			icon: TextSVGIcon,
			tags: [{ name: 'Advised', color: 'bg-purple-primary' }],
		},
		{
			name: 'Videos',
			icon: VideoIcon,
			tags: [{ name: 'WCAG', color: 'bg-muave-secondary' }],
		},
		{
			name: 'SVGs',
			icon: SVGIcon,
			tags: [{ name: 'WCAG', color: 'bg-muave-secondary' }],
		},
		{
			name: 'Audios',
			icon: AudioIcon,
			tags: [{ name: 'WCAG', color: 'bg-muave-secondary' }],
		},
		{
			name: 'Structure',
			icon: StructureIcon,
			tags: [{ name: 'WCAG', color: 'bg-muave-secondary' }],
		},
	],
	checkUtility: async (dom: Document, tabId) => {
		const checker = new ColorContrastChecker();
		const allImages = dom.querySelectorAll('img');
		const imagesWithoutAttributes = filter(
			allImages,
			(image) =>
				isEmpty(image.alt) && !isEmpty(image.src) && !startsWith(image.src, 'chrome-extension://')
		);
		const subErrorsImages = map(imagesWithoutAttributes, (imageNode) => ({
			records: [
				{ key: 'img src', value: `"${imageNode.src}"`, meta: 'link' },
				{ key: 'Alt attribute', value: 'empty' },
			],
		}));
		const { metaDataText: pollutedTexts, metaDataContrast } = await getComputedStyles(tabId);
		const [contrastIssuesAA, contrastIssuesAAA] = reduce(
			metaDataContrast,
			(result, { background, foreground, text, fontSize }) => {
				const foregroundColor = !checker.isValidSixDigitColorCode(RGBToHex(foreground))
					? rgbaToHex(foreground)
					: RGBToHex(foreground);
				const backgroundColor = !checker.isValidSixDigitColorCode(RGBToHex(background))
					? rgbaToHex(background)
					: RGBToHex(background);
				const isValidAA = checker.isLevelAA(foregroundColor, backgroundColor, fontSize);
				const isValidAAA = checker.isLevelAAA(foregroundColor, backgroundColor, fontSize);
				const l1 = checker.hexToLuminance(foregroundColor);
				const l2 = checker.hexToLuminance(backgroundColor);
				const ratio = checker.getContrastRatio(l1, l2);

				if (!isValidAA) {
					const [AAIssues] = result;
					result[0] = [
						...AAIssues,
						{
							records: [
								{ key: 'Text', value: text },
								{ key: 'Contrast', value: ratio.toFixed(2) },
								{ key: 'Colors', foreground, background },
							],
						},
					];
				}
				if (!isValidAAA) {
					const [, AAAIssues] = result;
					result[1] = [
						...AAAIssues,
						{
							records: [
								{ key: 'Text', value: text },
								{ key: 'Contrast', value: ratio.toFixed(2) },
								{ key: 'Colors', foreground, background },
							],
						},
					];
				}

				return result;
			},
			[[], []] as Array<
				Array<{
					records: Array<{ key: string; value?: string; foreground?: string; background?: string }>;
				}>
			>
		);
		const subErrorsTexts = map(pollutedTexts, ({ text, size }) => ({
			records: [
				{ key: 'Text', value: `"${text}"` },
				{ key: 'Font-size', value: `"${size}"` },
			],
		}));
		const allVideoNodes = dom.querySelectorAll('video');
		const { errors: videoErrors, type: videoErrorsType } = getVideoErrors(allVideoNodes);

		const contrastErrors = reduce(
			[contrastIssuesAA, contrastIssuesAAA],
			(acc, item, index) => {
				if (!isEmpty(item)) {
					const isFirst = index === 0;
					return [
						...acc,
						{
							title: `Minimum contrast of ${isFirst ? '4.5' : '6.5'} : 1  not satisfied`,
							errorType: 'error',
							tags: [
								{ name: '1.4.3', color: 'bg-orange-primary' },
								{ name: `Level ${isFirst ? 'A' : 'AA'}`, color: 'bg-orange-primary' },
							],
							subErrorCount: size(item),
							subErrors: item,
						},
					];
				}
				return acc;
			},
			[]
		);

		return {
			Images: {
				name: 'Images',
				type: size(imagesWithoutAttributes) === 0 ? 'success' : 'error',
				count: size(imagesWithoutAttributes),
				errors: !isEmpty(subErrorsImages)
					? [
							{
								title: 'Absence of Alt text in <img> tag',
								errorType: 'error',
								subErrorCount: size(imagesWithoutAttributes),
								subErrors: subErrorsImages,
								tags: [
									{ name: '1.1.1', color: 'bg-orange-primary' },
									{ name: 'Level A', color: 'bg-orange-primary' },
								],
								tips: [
									{
										description:
											'Images that do not convey content, are decorative, or contain content that is already conveyed in text are given empty alternative text alt="" which is ignored by screen readers.',
									},
								],
							},
					  ]
					: undefined,
			},
			Text: {
				name: 'Text',
				type: size(pollutedTexts) === 0 ? 'success' : 'error',
				count: size(pollutedTexts),
				errors: !isEmpty(subErrorsTexts)
					? [
							{
								title: 'Text having font size < 16',
								errorType: 'error',
								subErrorCount: size(subErrorsTexts),
								subErrors: subErrorsTexts,
							},
					  ]
					: undefined,
			},
			Videos: {
				name: 'Videos',
				type: videoErrorsType,
				count: size(videoErrors),
				errors: videoErrors,
			},
			Contrast: {
				name: 'Contrast',
				type: size([...contrastIssuesAA, ...contrastIssuesAAA]) === 0 ? 'success' : 'error',
				count: size([...contrastIssuesAA, ...contrastIssuesAAA]),
				errors: contrastErrors,
			},
			SVGs: {
				name: 'SVGs',
				type: 'success',
				count: 0,
			},
			Audios: {
				name: 'Audios',
				type: 'success',
				count: 0,
			},
			Structure: {
				name: 'Structure',
				type: 'success',
				count: 0,
			},
		} as AnalysisErrors;
	},
};
