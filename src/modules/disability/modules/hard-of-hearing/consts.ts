import { filter, isEmpty, reduce, size } from 'lodash';
import { VideoIcon, AudioIcon, ContactIcon } from '../../../../assets/icons';
import { AnalysisErrors, LayoutContainerProps } from '../../../../molecules/feature-layout/types';
import { ErrorRenderer } from '../../../utils/renderers';
import { getAllContactNumbers } from './utils';

export const ModuleSpecification: LayoutContainerProps = {
	title: 'Deaf & Hard of Hearing',
	description:
		'Over 5% of the world’s population – or 430 million people – require rehabilitation to address their ‘disabling’ hearing loss (432 million adults and 34 million children). It is estimated that by 2050 over 700 million people – or one in every ten people – will have disabling hearing loss.',
	errorRenderer: ErrorRenderer,
	checkpoints: [
		{ name: 'Videos', icon: VideoIcon, tags: [{ name: 'WCAG', color: 'bg-muave-secondary' }] },
		{ name: 'Audios', icon: AudioIcon, tags: [{ name: 'WCAG', color: 'bg-muave-secondary' }] },
		{ name: 'Contact', icon: ContactIcon, tags: [{ name: 'Advised', color: 'bg-purple-primary' }] },
	],
	testingEnabled: true,
	checkUtility: async (dom: Document) => {
		const allConcernedVideoElements = reduce(
			filter(dom.querySelectorAll('video'), (node) => !isEmpty(node.src)),
			(res, item) => [...res, { records: [{ key: 'Source src', value: item.src, meta: 'link' }] }],
			[]
		);
		const allConcernedAudioElements = reduce(
			filter(dom.querySelectorAll('audio'), (node) => !isEmpty(node.src)),
			(res, item) => [...res, { records: [{ key: 'Source src', value: item.src, meta: 'link' }] }],
			[]
		);
		const allContactErrors = getAllContactNumbers(dom);
		return {
			Videos: {
				name: 'Videos',
				type: isEmpty(allConcernedVideoElements) ? 'success' : 'warning',
				count: size(allConcernedVideoElements),
				errors: isEmpty(allConcernedVideoElements)
					? undefined
					: [
							{
								title: 'Provide pre-recorded captions for audio part',
								subErrors: allConcernedVideoElements,
								subErrorCount: size(allConcernedVideoElements),
								errorType: 'warning',
								tags: [
									{ name: '1.2.2', color: 'bg-orange-primary' },
									{ name: 'Level A', color: 'bg-orange-primary' },
								],
							},
					  ],
			},
			Audios: {
				name: 'Audios',
				type: isEmpty(allConcernedAudioElements) ? 'success' : 'warning',
				count: size(allConcernedAudioElements),
				errors: isEmpty(allConcernedAudioElements)
					? undefined
					: [
							{
								title: 'Provide text transcript for audio-only content',
								subErrors: allConcernedAudioElements,
								subErrorCount: size(allConcernedAudioElements),
								errorType: 'warning',
								tags: [
									{ name: '1.2.1', color: 'bg-orange-primary' },
									{ name: 'Level A', color: 'bg-orange-primary' },
								],
							},
							{
								title: 'Provide pre-recorded captions for audio content',
								subErrors: allConcernedAudioElements,
								subErrorCount: size(allConcernedAudioElements),
								errorType: 'warning',
								tags: [
									{ name: '1.2.2', color: 'bg-orange-primary' },
									{ name: 'Level A', color: 'bg-orange-primary' },
								],
							},
					  ],
			},
			Contact: {
				name: 'Contact',
				type: allContactErrors.type,
				count: size(allContactErrors.errors),
				errors: isEmpty(allContactErrors.errors)
					? undefined
					: [
							{
								subErrors: allContactErrors.errors,
								subErrorCount: size(allContactErrors.errors),
								errorType: 'warning',
								title: 'Provide multiple point of contacts other than ph. no.',
							},
					  ],
			},
		} as AnalysisErrors;
	},
};
