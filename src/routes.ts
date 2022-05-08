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
import { getComponent } from './modules/utils/renderers';
import { IndexRouteProps, LayoutRouteProps, PathRouteProps } from 'react-router-dom';

export const ROUTES: Array<PathRouteProps | IndexRouteProps | LayoutRouteProps> = [
	{
		path: '/disability/visual-impairment',
		element: getComponent(VisualImpairment),
	},
	{
		path: '/disability/cognitive-disability',
		element: getComponent(CognitiveDisabilities),
	},
	{
		path: '/disability/hard-of-hearing',
		element: getComponent(HardOfHearing),
	},
	{
		path: '/disability/motor-disability',
		element: getComponent(MotorDisabilities),
	},
	{
		path: '/disability/speech-impairment',
		element: getComponent(SpeechImpairment),
	},
	{
		path: '/identity/age',
		element: getComponent(Age),
	},
	{
		path: '/identity/gender-identity',
		element: getComponent(GenderIdentity),
	},
	{
		path: '/identity/race-and-ethnicity',
		element: getComponent(RaceAndEthnicity),
	},
	{
		path: '/experience/education',
		element: getComponent(Education),
	},
	{
		path: '/experience/language',
		element: getComponent(Language),
	},
	{
		path: '*',
		element: getComponent(Home),
	},
];
