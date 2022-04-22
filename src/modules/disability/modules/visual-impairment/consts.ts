import { AnalysisErrors, LayoutContainerProps } from '../../../../molecules/feature-layout/types';
import { ErrorRenderer } from '../../../utils/renderers';
import { filter, isEmpty, size, map, startsWith, reduce } from 'lodash';
import Photograph from '../../../../assets/icons/Photograph';
import TextIcon from '../../../../assets/icons/Textsvg';
import { getComputedStyles, rgbaToHex, RGBToHex } from '../../../utils/utils';
import Video from '../../../../assets/icons/Video';
import ContrastIcon from '../../../../assets/icons/ContrastIcon';
import ContrastErrorAccordion from './renderers';
//@ts-ignore
import ColorContrastChecker from 'color-contrast-checker';

export const ModuleSpecification: LayoutContainerProps = {
	title: 'Vision Impairment',
	description:
		'World Health Organization (WHO) estimates that there are 246 million people worldwide who have low vision and 39 million people are blind, indicating that 86% of the people with visual impairments have low vision.',
	errorRenderer: ErrorRenderer,
	checkpoints: [
		{
			name: 'Images',
			icon: Photograph,
			tags: [
				{ name: '1.1.1', color: 'bg-brown-primary' },
				{ name: 'Level A', color: 'bg-orange-primary' },
				{ name: 'WCAG', color: 'bg-muave-secondary' },
			],
			tips: [
				{
					description:
						'Images that do not convey content, are decorative, or contain content that is already conveyed in text are given empty alternative text alt="" which is ignored by screen readers.',
				},
			],
		},
		{
			name: 'Contrast',
			icon: ContrastIcon,
			ErrorAccordion: ContrastErrorAccordion,
		},
		{
			name: 'Text',
			icon: TextIcon,
			tags: [{ name: 'Advised', color: 'bg-purple-primary' }],
		},
		{
			name: 'Videos',
			icon: Video,
			tags: [
				{ name: '1.2', color: 'bg-brown-primary' },
				{ name: 'Level A', color: 'bg-orange-primary' },
				{ name: 'WCAG', color: 'bg-muave-secondary' },
			],
			tips: [
				{
					description:
						'Provide a text transcript that conveys the same information as video-only media or Provide an audio-track that conveys the same information as video-only media.',
				},
			],
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
		const contrastIssues = reduce(
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
				if (!isValidAA || !isValidAAA)
					return [
						...result,
						{
							ratio: ratio.toFixed(2),
							text,
							background,
							foreground,
						},
					];
				else return result;
			},
			[] as Array<{ ratio: number; text: string; background: string; foreground: string }>
		);
		const subErrorsTexts = map(pollutedTexts, ({ text, size }) => ({
			records: [
				{ key: 'Text', value: `"${text}"` },
				{ key: 'Font-size', value: `"${size}"` },
			],
		}));
		const allVideoNodes = dom.querySelectorAll('video');
		const concernedVideoNodes = filter(allVideoNodes, (video) => !isEmpty(video.src));
		const subErrorsVideo = map(concernedVideoNodes, (videoNode) => ({
			records: [
				{ key: 'Source src', value: `"${videoNode.src}"`, meta: 'link' },
				{ key: 'Track', value: 'empty' },
			],
		}));
		return {
			Images: {
				name: 'Images',
				type: size(imagesWithoutAttributes) === 0 ? 'success' : 'error',
				count: size(imagesWithoutAttributes),
				errors: [
					{
						title: `Absence of Alt text in <img> tag`,
						errorType: 'error',
						subErrorCount: size(imagesWithoutAttributes),
						subErrors: subErrorsImages,
					},
				],
			},
			Text: {
				name: 'Text',
				type: size(pollutedTexts) === 0 ? 'success' : 'error',
				count: size(pollutedTexts),
				errors: [
					{
						title: 'Text having font size < 16',
						errorType: 'error',
						subErrorCount: size(subErrorsTexts),
						subErrors: subErrorsTexts,
					},
				],
			},
			Videos: {
				name: 'Videos',
				type: size(concernedVideoNodes) === 0 ? 'success' : 'warning',
				count: size(concernedVideoNodes),
				errors: [
					{
						title: 'Alternate media for video content',
						errorType: 'warning',
						subErrorCount: size(subErrorsVideo),
						subErrors: subErrorsVideo,
					},
				],
			},
			Contrast: {
				name: 'Contrast',
				type: size(contrastIssues) === 0 ? 'success' : 'error',
				count: size(contrastIssues),
				errors: [
					{
						title: 'Inadequate contrast ratio',
						errorType: 'error',
						subErrorCount: size(contrastIssues),
						subErrors: contrastIssues,
					},
				],
			},
		} as AnalysisErrors;
	},
};
