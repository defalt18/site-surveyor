import React, { Dispatch, SetStateAction } from 'react';
import { AnalysisErrors } from '../types';
import { VIEWS } from '../consts';

export const LayoutContext = React.createContext<
	| {
			errors: AnalysisErrors;
			setErrors: Dispatch<SetStateAction<AnalysisErrors>>;
			screen: { view: VIEWS; checkpoint?: string };
			setView: Dispatch<SetStateAction<{ view: VIEWS; checkpoint?: string }>>;
	  }
	| undefined
>(undefined);

export default function useLayoutContext() {
	return React.useContext(LayoutContext);
}
