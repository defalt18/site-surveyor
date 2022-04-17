import { AnalysisErrors, LayoutContainerProps } from '../../../../molecules/feature-layout/types';
import { ErrorRenderer } from '../../../utils/renderers';
import Textsvg from '../../../../assets/icons/Textsvg';

export const ModuleSpecification: LayoutContainerProps = {
	title: 'Access to high-tech',
	description:
		'According to Ethnologue, there are currently 7,117 languages spoken around the world.',
	errorRenderer: ErrorRenderer,
	checkpoints: [{ name: 'Internet', icon: Textsvg }],
	testingEnabled: false,
	checkUtility: async () => ({} as AnalysisErrors),
};
