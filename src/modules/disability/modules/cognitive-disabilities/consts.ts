import { AnalysisErrors, LayoutContainerProps } from '../../../../molecules/feature-layout/types';
import { ErrorRenderer } from '../../../utils/renderers';
import Photograph from '../../../../assets/icons/Photograph';
import Video from '../../../../assets/icons/Video';
import LanguageIcon from '../../../../assets/icons/LanguageIcon';
import Audio from '../../../../assets/icons/Audio';

export const ModuleSpecification: LayoutContainerProps = {
	title: 'Cognitive Disabilities',
	description:
		'Approximately 1 – 3 percent of the global population has an intellectual/cognitive disability—as many as 200 million people. Cognitive disability is significantly more common in low-income countries—16.41 in every 1,000 people.',
	errorRenderer: ErrorRenderer,
	checkpoints: [
		{ name: 'Images', icon: Photograph },
		{ name: 'Videos', icon: Video },
		{ name: 'Language', icon: LanguageIcon },
		{ name: 'Audio', icon: Audio },
	],
	testingEnabled: false,
	checkUtility: async () => ({} as AnalysisErrors),
};
