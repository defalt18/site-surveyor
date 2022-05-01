import React, { SetStateAction, Dispatch, useEffect } from 'react';
import { noop } from 'lodash';
export const HeaderContext = React.createContext<
	{ setBackFn: Dispatch<SetStateAction<() => void>> } | undefined
>(undefined);

export function useHeaderContext(props?: { onBack: () => void }) {
	const { onBack } = props;
	const { setBackFn } = React.useContext(HeaderContext);
	useEffect(() => {
		setBackFn(() => onBack);
		return () => setBackFn(noop);
	}, [setBackFn, onBack]);
}
