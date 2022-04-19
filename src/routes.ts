import VisualImpairment from './modules/disability/modules/visual-impairment/views';
import Home from './modules/home/views';
import CognitiveDisabilities from './modules/disability/modules/cognitive-disabilities/views';
import HardOfHearing from './modules/disability/modules/hard-of-hearing/views';
import SpeechImpairment from './modules/disability/modules/speech-impairment/views';
import MotorDisabilities from './modules/disability/modules/motor-disability/views';
import Age from './modules/identity/modules/age/views';
import GenderIdentity from './modules/identity/modules/gender-identity/views';
import RaceAndEthnicity from './modules/identity/modules/race-and-ethinicity/views';
import Education from './modules/experience/modules/education/views';
import Language from './modules/experience/modules/language/views';

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
