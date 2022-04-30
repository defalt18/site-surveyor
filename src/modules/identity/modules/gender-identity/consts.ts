import { AnalysisErrors, LayoutContainerProps } from '../../../../molecules/feature-layout/types';
import { ErrorRenderer } from '../../../utils/renderers';
import FormIcon from '../../../../assets/icons/FormIcon';
import PronounIcon from '../../../../assets/icons/PronounIcon';
import { PhotographIcon } from '../../../../assets/icons';
import { filter, isEmpty, reduce, size, startsWith } from 'lodash';

export const ModuleSpecification: LayoutContainerProps = {
	title: 'Gender Identity',
	description:
		'80% of Gen Z (people born from the mid-1990s to the early 2000s) believe that gender does not define a person as much as it used to, and over 50% said that they knew someone who went by gender-neutral pronouns (“ze” or “they”).',
	errorRenderer: ErrorRenderer,
	checkpoints: [
		{ name: 'Form Field', icon: FormIcon, tags: [{ name: 'Advised', color: 'bg-purple-primary' }] },
		{
			name: 'Pronouns',
			icon: PronounIcon,
			tags: [{ name: 'Advised', color: 'bg-purple-primary' }],
		},
		{
			name: 'Images',
			icon: PhotographIcon,
			tags: [{ name: 'Advised', color: 'bg-purple-primary' }],
		},
	],
	testingEnabled: true,
	checkUtility: async (dom) => {
		const allImages = reduce(
			filter(
				dom.querySelectorAll('img'),
				(node) => !isEmpty(node.src) && !startsWith(node.src, 'chrome-extension://')
			),
			(res, item) => [...res, { records: [{ key: 'src', value: item.src, meta: 'link' }] }],
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
								title: 'Make sure to use inclusive imagery',
								subErrorCount: size(allImages),
								subErrors: allImages,
								errorType: 'warning',
							},
					  ],
			},
			Pronouns: {
				name: 'Pronouns',
				count: 0,
				type: 'success',
				errors: [
					{
						title: 'Presence of pronouns like “he” and “she”',
						subErrors: [
							{
								description:
									'Make sure you avoid unnecessary gender references and stereotypical words such as “guys” and “dudes”. Basically, anything that sounds gender-biased and non-inclusive. ',
							},
						],
						subErrorCount: 1,
						errorType: 'success',
					},
				],
			},
			'Form Field': {
				name: 'Form Field',
				count: 0,
				type: 'success',
				errors: [
					{
						title: 'Absence of extra options other than binary genders',
						subErrors: [
							{
								description:
									'Consider providing inclusive options, such as nonbinary, self-identify, and decline to state. In this situation, you could also let people specify the pronouns they use so you can address them properly when necessary',
							},
						],
						subErrorCount: 1,
						errorType: 'success',
					},
				],
			},
		} as AnalysisErrors;
	},
};
