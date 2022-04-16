import React, { Dispatch, SetStateAction } from 'react';
import { VIEWS } from './consts';
import { AnalysisErrors, LayoutContainerProps } from './types';
import LayoutReport from './Layout.report';
import LayoutDetails from './Layout.details';

export const LayoutContext = React.createContext<
	| {
			errors: AnalysisErrors;
			setErrors: Dispatch<SetStateAction<AnalysisErrors>>;
			screen: { view: VIEWS; checkpoint?: string };
			setView: Dispatch<SetStateAction<{ view: VIEWS; checkpoint?: string }>>;
	  }
	| undefined
>(undefined);

function LayoutContainer(props: LayoutContainerProps) {
	const [screen, setView] = React.useState<{ view: VIEWS; checkpoint?: string }>({
		view: VIEWS.DETAILS,
	});

	const [errors, setErrors] = React.useState<AnalysisErrors | undefined>();

	if (screen.view === VIEWS.DETAILS)
		return (
			<LayoutContext.Provider value={{ errors, setErrors, screen, setView }}>
				<LayoutDetails {...props} />
			</LayoutContext.Provider>
		);

	return (
		<LayoutContext.Provider value={{ errors, setErrors, screen, setView }}>
			<LayoutReport {...props} />
		</LayoutContext.Provider>
	);
}

export default React.memo(LayoutContainer);
