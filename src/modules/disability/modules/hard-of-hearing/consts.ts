import { AnalysisErrors, LayoutContainerProps } from '../../../../molecules/feature-layout/types';
import { ErrorRenderer } from '../../../utils/renderers';
import Video from '../../../../assets/icons/Video';
import Audio from '../../../../assets/icons/Audio';

export const ModuleSpecification: LayoutContainerProps = {
	title: 'Deaf & Hard of Hearing',
	description:
		'Over 5% of the world’s population – or 430 million people – require rehabilitation to address their ‘disabling’ hearing loss (432 million adults and 34 million children). It is estimated that by 2050 over 700 million people – or one in every ten people – will have disabling hearing loss.',
	errorRenderer: ErrorRenderer,
	checkpoints: [
		{ name: 'Videos', icon: Video },
		{ name: 'Audio', icon: Audio },
	],
	testingEnabled: false,
	checkUtility: async () => ({} as AnalysisErrors),
};
