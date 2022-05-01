import { AnalysisErrors, LayoutContainerProps } from '../../../../molecules/feature-layout/types';
import { ErrorRenderer } from '../../../utils/renderers';
import { TextSVGIcon } from '../../../../assets/icons';
import { isEmpty, filter, reduce, size, startsWith } from 'lodash';

export const ModuleSpecification: LayoutContainerProps = {
	title: 'Access to high-tech',
	description:
		'Many rural and low-income communities around the world, including those in large urban areas, lack reliable, affordable internet access.',
	errorRenderer: ErrorRenderer,
	checkpoints: [
		{
			name: 'Slow Internet',
			icon: TextSVGIcon,
			tags: [{ name: 'Advised', color: 'bg-purple-primary' }],
		},
	],
	testingEnabled: true,
	checkUtility: async (dom) => {
		const pollutedImages = reduce(
			filter(
				dom.querySelectorAll('img'),
				(node) =>
					isEmpty(node.alt) && !isEmpty(node.src) && !startsWith(node.src, 'chrome-extension://')
			),
			(res, item) => [
				...res,
				{
					records: [
						{ key: 'Source src', value: item.src, meta: 'link' },
						{ key: 'Alt atrribute', value: 'empty' },
					],
				},
			],
			[]
		);
		const errorDetail = isEmpty(pollutedImages)
			? []
			: [
					{
						title: 'Absense of alt text for images',
						subErrors: pollutedImages,
						subErrorCount: size(pollutedImages),
						errorType: 'error',
						tips: [
							{
								description:
									'Add alt text for images in case they fail to load due to slow internet connection.',
							},
						],
					},
			  ];
		return {
			'Slow Internet': {
				name: 'Slow Internet',
				type: size(pollutedImages) > 0 ? 'error' : 'warning',
				count: size(pollutedImages) + 1,
				errors: [
					{
						title: 'Add Skeleton loaders',
						subErrors: [
							{
								description:
									'Add skeleton loader in case page content takes time to load due to slow internet connection.',
							},
						],
						subErrorCount: 1,
						errorType: 'success',
					},
					...errorDetail,
				],
			},
		} as AnalysisErrors;
	},
};
