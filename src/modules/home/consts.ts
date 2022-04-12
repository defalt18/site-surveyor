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
			{ name: 'Speech Impairment' },
			{ name: 'Hard of Hearing' },
			{ name: 'Motor Disabilities' },
			{ name: 'Cognitive Disabilities' },
		],
	},
	Identity: {
		bgColor: 'bg-purple-primary',
		data: [{ name: 'Gender Identity' }, { name: 'Race' }, { name: 'Race and Ethnicity' }],
	},
	Experience: {
		bgColor: 'bg-green-primary',
		data: [{ name: 'Language' }, { name: 'Education' }],
	},
};
