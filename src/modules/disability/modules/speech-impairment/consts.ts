import { AnalysisErrors, LayoutContainerProps } from '../../../../molecules/feature-layout/types';
import { ErrorRenderer } from '../../../utils/renderers';
import { getAllContactNumbers } from '../hard-of-hearing/utils';
import { ContactIcon } from '../../../../assets/icons';
import { isEmpty, size } from 'lodash';

export const ModuleSpecification: LayoutContainerProps = {
	title: 'Speech impairment',
	description: 'Approximately 18.5 million individuals have a speech, voice, or language disorder.',
	errorRenderer: ErrorRenderer,
	checkpoints: [
		{ name: 'Contact', icon: ContactIcon, tags: [{ name: 'Advised', color: 'bg-purple-primary' }] },
	],
	testingEnabled: true,
	checkUtility: async (dom) => {
		const allContactErrors = getAllContactNumbers(dom);
		return {
			Contact: {
				name: 'Contact',
				type: allContactErrors.type,
				count: size(allContactErrors.errors),
				errors: isEmpty(allContactErrors.errors)
					? undefined
					: [
							{
								title: 'Provide multiple point of contacts other than ph. no.',
								subErrors: allContactErrors.errors,
								subErrorCount: size(allContactErrors.errors),
								errorType: 'warning',
							},
					  ],
			},
		} as AnalysisErrors;
	},
};
