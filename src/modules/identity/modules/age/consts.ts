import { AnalysisErrors, LayoutContainerProps } from '../../../../molecules/feature-layout/types';
import { ErrorRenderer } from '../../../utils/renderers';
import { ResizingIcon } from '../../../../assets/icons';

export const ModuleSpecification: LayoutContainerProps = {
	title: 'Age',
	description:
		'There were 703 million persons aged 65 years or over in the world in 2019. The number of older persons is projected to double to 1.5 billion in 2050.',
	errorRenderer: ErrorRenderer,
	checkpoints: [
		{ name: 'Resizing', icon: ResizingIcon, tags: [{ name: 'WCAG', color: 'bg-muave-secondary' }] },
	],
	testingEnabled: true,
	checkUtility: async () => {
		return {
			Resizing: {
				name: 'Resizing',
				count: 0,
				type: 'success',
				errors: [
					{
						title: 'Not using scalable units “em”  for text-container ',
						subErrorCount: 1,
						subErrors: [
							{
								description:
									'Specifying height and width of text-xontainers in em units will allow user agents that support text resizing to resize the text containers in line with changes in text size settings.',
							},
						],
						tags: [{ name: '1.4.4' }, { name: 'Level AA' }],
						errorType: 'success',
					},
					{
						title: 'Not using scalable units “em” or “percent” for font-size',
						tags: [{ name: '1.4.4' }, { name: 'Level AA' }],
						subErrorCount: 1,
						subErrors: [
							{
								description:
									'Specifying font-size in em or percent units will allow user agents that support text resizing to resize the text in text size settings.',
							},
						],
						errorType: 'success',
					},
				],
			},
		} as AnalysisErrors;
	},
};
