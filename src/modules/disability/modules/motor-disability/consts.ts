import { AnalysisErrors, LayoutContainerProps } from '../../../../molecules/feature-layout/types';
import { ErrorRenderer } from '../../../utils/renderers';
import Keyboard from '../../../../assets/icons/Keyboard';

export const ModuleSpecification: LayoutContainerProps = {
	title: 'Motor Disability',
	description:
		'13.7 percent of people with a disability have a mobility disability with serious difficulty walking or climbing stairs. 75 million people need a wheelchair on a daily basis. This represents 1% of the world’s populattion.',
	errorRenderer: ErrorRenderer,
	checkpoints: [{ name: 'Keyboard', icon: Keyboard }],
	testingEnabled: false,
	checkUtility: async () => ({} as AnalysisErrors),
};
