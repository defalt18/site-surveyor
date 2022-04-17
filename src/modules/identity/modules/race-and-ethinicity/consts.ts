import { AnalysisErrors, LayoutContainerProps } from '../../../../molecules/feature-layout/types';
import { ErrorRenderer } from '../../../utils/renderers';
import Photograph from '../../../../assets/icons/Photograph';
import FormIcon from '../../../../assets/icons/FormIcon';

export const ModuleSpecification: LayoutContainerProps = {
	title: 'Race and Ethnicity',
	description:
		'Racial inclusion in design can also unlock market opportunities previously hidden to your competitors.',
	errorRenderer: ErrorRenderer,
	checkpoints: [
		{ name: 'Form field', icon: FormIcon },
		{ name: 'Images', icon: Photograph },
	],
	testingEnabled: false,
	checkUtility: async () => ({} as AnalysisErrors),
};
