import { AnalysisErrors, LayoutContainerProps } from '../../../../molecules/feature-layout/types';
import { ErrorRenderer } from '../../../utils/renderers';
import FormIcon from '../../../../assets/icons/FormIcon';
import PronounIcon from '../../../../assets/icons/PronounIcon';

export const ModuleSpecification: LayoutContainerProps = {
	title: 'Gender Identity',
	description:
		'80% of Gen Z (people born from the mid-1990s to the early 2000s) believe that gender does not define a person as much as it used to, and over 50% said that they knew someone who went by gender-neutral pronouns (“ze” or “they”).',
	errorRenderer: ErrorRenderer,
	checkpoints: [
		{ name: 'Form Field', icon: FormIcon },
		{ name: 'Pronouns', icon: PronounIcon },
	],
	testingEnabled: false,
	checkUtility: async () => ({} as AnalysisErrors),
};
