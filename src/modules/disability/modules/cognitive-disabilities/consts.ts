import { AnalysisErrors, LayoutContainerProps } from '../../../../molecules/feature-layout/types';
import { ErrorRenderer } from '../../../utils/renderers';
import { AutoCompleteIcon, AudioIcon, VideoIcon, PhotographIcon } from '../../../../assets/icons';
import { filter, isEmpty, reduce, size, startsWith } from 'lodash';
import { getAudioErrors, getVideoErrors } from '../visual-impairment/utils';

export const ModuleSpecification: LayoutContainerProps = {
	title: 'Cognitive Disabilities',
	description:
		'Approximately 1 – 3 percent of the global population has an intellectual/cognitive disability—as many as 200 million people. Cognitive disability is significantly more common in low-income countries—16.41 in every 1,000 people.',
	errorRenderer: ErrorRenderer,
	checkpoints: [
		{ name: 'Images', icon: PhotographIcon, tags: [{ name: 'WCAG', color: 'bg-muave-secondary' }] },
		{ name: 'Videos', icon: VideoIcon, tags: [{ name: 'WCAG', color: 'bg-muave-secondary' }] },
		{
			name: 'Auto-complete',
			icon: AutoCompleteIcon,
			tags: [{ name: 'WCAG', color: 'bg-muave-secondary' }],
		},
		{ name: 'Audio', icon: AudioIcon, tags: [{ name: 'WCAG', color: 'bg-muave-secondary' }] },
	],
	testingEnabled: true,
	checkUtility: async (dom) => {
		const allImages = reduce(
			filter(
				dom.querySelectorAll('img'),
				(node) =>
					isEmpty(node.alt) && !isEmpty(node.src) && !startsWith(node.src, 'chrome-extension://')
			),
			(res, item) => [...res, { records: [{ key: 'img src', value: item.src, meta: 'link' }] }],
			[]
		);
		const { errors: videoErrors } = getVideoErrors(dom.querySelectorAll('video'));
		const { errors: audioErrors } = getAudioErrors(dom.querySelectorAll('audio'));

		const allInputs = reduce(
			filter(dom.querySelectorAll('input'), (node) => isEmpty(node.autocomplete)),
			(res, item) => [
				...res,
				{
					records: [
						{ key: 'Input type', value: item.type },
						{ key: 'Auto-complete', value: 'absent' },
					],
				},
			],
			[]
		);
		return {
			Images: {
				name: 'Images',
				count: 0,
				type: 'success',
				errors: isEmpty(allImages)
					? undefined
					: [
							{
								title: 'Provide alternate text explaining the image content',
								tags: [{ name: '1.1.1' }, { name: 'Level A' }],
								subErrors: allImages,
								subErrorCount: size(allImages),
								errorType: 'warning',
							},
					  ],
			},
			Videos: {
				name: 'Videos',
				count: 0,
				type: 'success',
				errors: isEmpty(videoErrors) ? undefined : videoErrors,
			},
			Audios: {
				name: 'Audios',
				count: 0,
				type: 'success',
				errors: isEmpty(audioErrors) ? undefined : audioErrors,
			},
			'Auto-complete': {
				name: 'Auto-complete',
				count: size(allInputs),
				type: isEmpty(allInputs) ? 'success' : 'error',
				errors: isEmpty(allInputs)
					? undefined
					: [
							{
								title: 'Absence of auto-complete attribute in <input> tag',
								subErrors: allInputs,
								subErrorCount: size(allInputs),
								errorType: 'error',
								tags: [{ name: '1.3.5' }, { name: 'Level AA' }],
							},
					  ],
			},
		} as AnalysisErrors;
	},
};
