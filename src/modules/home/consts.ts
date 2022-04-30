import HomeEye from '../../assets/icons/HomeEye';
import HomeEar from '../../assets/icons/HomeEar';
import HomeSpeech from '../../assets/icons/HomeSpeech';
import HomeMotor from '../../assets/icons/HomeMotor';
import HomeBulb from '../../assets/icons/HomeBulb';
import HomePerson from '../../assets/icons/HomePerson';
import HomeTime from '../../assets/icons/HomeTime';
import HomeSmiley from '../../assets/icons/HomeSmiley';
import HomeLang from '../../assets/icons/HomeLang';
import HomeWifi from '../../assets/icons/HomeWifi';

export const FEATURES: Record<
	string,
	{
		bgColor: string;
		data: Array<{
			name: string;
			icon?: (props: any) => JSX.Element;
			iconClassName?: string;
			disabled?: boolean;
			path?: string;
		}>;
	}
> = {
	Disability: {
		bgColor: 'bg-brown-primary',
		data: [
			{
				name: 'Vision Impairment',
				icon: HomeEye,
				disabled: false,
				path: '/disability/visual-impairment',
			},
			{
				name: 'Speech Impairment',
				icon: HomeSpeech,
				disabled: false,
				path: '/disability/speech-impairment',
			},
			{
				name: 'Hard of Hearing',
				icon: HomeEar,
				disabled: false,
				path: '/disability/hard-of-hearing',
			},
			{
				name: 'Motor Disabilities',
				icon: HomeMotor,
				disabled: false,
				path: '/disability/motor-disability',
			},
			{
				name: 'Cognitive Disabilities',
				disabled: false,
				icon: HomeBulb,
				path: '/disability/cognitive-disability',
			},
		],
	},
	Identity: {
		bgColor: 'bg-purple-primary',
		data: [
			{
				name: 'Gender Identity',
				icon: HomePerson,
				disabled: false,
				path: '/identity/gender-identity',
			},
			{ name: 'Age', disabled: false, icon: HomeTime, path: '/identity/age' },
			{ name: 'Culture', disabled: false, icon: HomeSmiley, path: '/identity/race-and-ethnicity' },
		],
	},
	Experience: {
		bgColor: 'bg-green-primary',
		data: [
			{ name: 'Language', icon: HomeLang, disabled: false, path: '/experience/language' },
			{ name: 'Education', icon: HomeWifi, disabled: false, path: '/experience/education' },
		],
	},
};
