import { AnalysisErrors, LayoutContainerProps } from '../../../../molecules/feature-layout/types';
import { ErrorRenderer } from '../../../utils/renderers';
import Textsvg from '../../../../assets/icons/Textsvg';

export const ModuleSpecification: LayoutContainerProps = {
	title: 'Age',
	description:
		'There were 703 million persons aged 65 years or over in the world in 2019. The number of older persons is projected to double to 1.5 billion in 2050.',
	errorRenderer: ErrorRenderer,
	checkpoints: [{ name: 'Font-size', icon: Textsvg }],
	testingEnabled: false,
	checkUtility: async () => ({} as AnalysisErrors),
};
