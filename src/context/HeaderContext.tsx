import React, { SetStateAction, Dispatch, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
export const HeaderContext = React.createContext<
	{ setBackFn: Dispatch<SetStateAction<() => void>> } | undefined
>(undefined);

export function useHeaderContext(props?: { onBack: () => void }) {
	const { onBack } = props;
	const location = useLocation();
	const navigate = useNavigate();
	const { setBackFn } = React.useContext(HeaderContext);
	const DEFAULT_VALUE = useCallback(
		// @ts-ignore
		() => navigate(location.state?.details),
		// @ts-ignore
		[location.state?.details, navigate]
	);
	useEffect(() => {
		setBackFn(() => onBack);
		return () => setBackFn(() => DEFAULT_VALUE);
	}, [setBackFn, onBack, DEFAULT_VALUE]);
}
