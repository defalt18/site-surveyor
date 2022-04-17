import Eye from '../../assets/icons/Eye';

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
				icon: Eye,
				iconClassName: 'ml-4',
				disabled: false,
				path: '/disability/visual-impairment',
			},
			{ name: 'Speech Impairment', disabled: false, path: '/disability/speech-impairment' },
			{ name: 'Hard of Hearing', disabled: false, path: '/disability/hard-of-hearing' },
			{ name: 'Motor Disabilities', disabled: false, path: '/disability/motor-disability' },
			{
				name: 'Cognitive Disabilities',
				disabled: false,
				path: '/disability/cognitive-disability',
			},
		],
	},
	Identity: {
		bgColor: 'bg-purple-primary',
		data: [
			{ name: 'Gender Identity', disabled: false, path: '/identity/gender-identity' },
			{ name: 'Age', disabled: false, path: '/identity/age' },
			{ name: 'Race and Ethnicity', disabled: false, path: '/identity/race-and-ethnicity' },
		],
	},
	Experience: {
		bgColor: 'bg-green-primary',
		data: [
			{ name: 'Language', disabled: false, path: '/experience/language' },
			{ name: 'Education', disabled: false, path: '/experience/education' },
		],
	},
};
