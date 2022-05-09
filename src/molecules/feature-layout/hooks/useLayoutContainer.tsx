import React, { useCallback, useMemo } from 'react';
import { VIEWS } from '../consts';
import { AnalysisErrors } from '../types';
import { useNavigate } from 'react-router-dom';
import { useHeaderContext } from '../../../context/HeaderContext';
import LayoutDetails from '../Layout.details';
import LayoutReport from '../Layout.report';

const ComponentMap = {
	[VIEWS.DETAILS]: LayoutDetails,
	[VIEWS.REPORT]: LayoutReport,
};

export default function useLayoutContainer() {
	const [screen, setView] = React.useState<{ view: VIEWS; checkpoint?: string }>({
		view: VIEWS.DETAILS,
	});

	const [errors, setErrors] = React.useState<AnalysisErrors | undefined>();
	const navigate = useNavigate();

	const onClick = useCallback(() => {
		if (screen.view === VIEWS.DETAILS) return navigate('/');
		return setView({ view: VIEWS.DETAILS });
	}, [navigate, screen, setView]);

	useHeaderContext({
		LeftNode: (
			<button onClick={onClick}>
				<span className='text-primary text-light-primary text-4xl'>{'<'}</span>
			</button>
		),
	});

	const contextValue = useMemo(() => ({ errors, setErrors, screen, setView }), [errors, screen]);

	return { contextValue, Component: ComponentMap[screen.view] };
}
