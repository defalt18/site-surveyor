import VisualImpairment from './src/modules/disability/modules/visual-impairment/views';
import Home from './src/modules/home/views';

export const ROUTES: Array<{ path: string; element: () => JSX.Element }> = [
	{
		path: '/disability/visual-impairment',
		element: VisualImpairment,
	},
	{
		path: '*',
		element: Home,
	},
];
