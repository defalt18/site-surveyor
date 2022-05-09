import React, { SetStateAction, Dispatch, useEffect, ReactNode } from 'react';
export const HeaderContext = React.createContext<
	{ setHeaderProps: Dispatch<SetStateAction<ReactNode>> } | undefined
>(undefined);

export function useHeaderContext(props?: { LeftNode: ReactNode }) {
	const { LeftNode } = props;
	const { setHeaderProps } = React.useContext(HeaderContext);
	useEffect(() => {
		setHeaderProps(LeftNode);
		return () => setHeaderProps(undefined);
	}, [setHeaderProps, LeftNode]);
}
