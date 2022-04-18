import { AnalysisErrors, LayoutContainerProps } from '../../../../molecules/feature-layout/types';
import { ErrorRenderer } from '../../../utils/renderers';
import { filter, isEmpty, size, map, startsWith } from 'lodash';
import Photograph from '../../../../assets/icons/Photograph';
import TextIcon from '../../../../assets/icons/Textsvg';
import { getComputedStyles } from '../../../utils/utils';
import Video from '../../../../assets/icons/Video';

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
			tip: {
				description:
					'Images that do not convey content, are decorative, or contain content that is already conveyed in text are given empty alternative text alt="" which is ignored by screen readers.',
			},
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
			tip: {
				description:
					'Provide a text transcript that conveys the same information as video-only media or Provide an audio-track that conveys the same information as video-only media.',
			},
		},
	],
	checkUtility: async (dom: Document, tabId) => {
		const allImages = dom.querySelectorAll('img');
		const imagesWithoutAttributes = filter(
			allImages,
			(image) => isEmpty(image.alt) && !startsWith(image.src, 'chrome-extension://')
		);
		const subErrorsImages = map(imagesWithoutAttributes, (imageNode) => ({
			records: [
				{ key: 'img src', value: `"${imageNode.src}"`, meta: 'link' },
				{ key: 'Alt attribute', value: 'empty' },
			],
		}));
		const pollutedTexts = await getComputedStyles(tabId);
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
		} as AnalysisErrors;
	},
};
