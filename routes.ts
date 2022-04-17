import VisualImpairment from './src/modules/disability/modules/visual-impairment/views';
import Home from './src/modules/home/views';
import CognitiveDisabilities from './src/modules/disability/modules/cognitive-disabilities/views';
import HardOfHearing from './src/modules/disability/modules/hard-of-hearing/views';
import SpeechImpairment from './src/modules/disability/modules/speech-impairment/views';
import MotorDisabilities from './src/modules/disability/modules/motor-disability/views';
import Age from './src/modules/identity/modules/age/views';
import GenderIdentity from './src/modules/identity/modules/gender-identity/views';
import RaceAndEthnicity from './src/modules/identity/modules/race-and-ethinicity/views';
import Education from './src/modules/experience/modules/education/views';
import Language from './src/modules/experience/modules/language/views';

export const ROUTES: Array<{ path: string; element: () => JSX.Element }> = [
	{
		path: '/disability/visual-impairment',
		element: VisualImpairment,
	},
	{
		path: '/disability/cognitive-disability',
		element: CognitiveDisabilities,
	},
	{
		path: '/disability/hard-of-hearing',
		element: HardOfHearing,
	},
	{
		path: '/disability/motor-disability',
		element: MotorDisabilities,
	},
	{
		path: '/disability/speech-impairment',
		element: SpeechImpairment,
	},
	{
		path: '/identity/age',
		element: Age,
	},
	{
		path: '/identity/gender-identity',
		element: GenderIdentity,
	},
	{
		path: '/identity/race-and-ethnicity',
		element: RaceAndEthnicity,
	},
	{
		path: '/experience/education',
		element: Education,
	},
	{
		path: '/experience/language',
		element: Language,
	},
	{
		path: '*',
		element: Home,
	},
];
