import { AnalysisErrors, LayoutContainerProps } from '../../../../molecules/feature-layout/types';
import { ErrorRenderer } from '../../../utils/renderers';
import Contact from '../../../../assets/icons/Contact';

export const ModuleSpecification: LayoutContainerProps = {
	title: 'Speech impairment',
	description: 'Approximately 18.5 million individuals have a speech, voice, or language disorder.',
	errorRenderer: ErrorRenderer,
	checkpoints: [{ name: 'Contact', icon: Contact }],
	testingEnabled: false,
	checkUtility: async () => ({} as AnalysisErrors),
};
