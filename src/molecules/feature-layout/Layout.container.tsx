import React from 'react';
import { LayoutContainerProps } from './types';
import useLayoutContainer from './hooks/useLayoutContainer';
import { LayoutContext } from './hooks/useLayoutContext';

function LayoutContainer(props: LayoutContainerProps) {
	const { contextValue, Component } = useLayoutContainer();

	return (
		<LayoutContext.Provider value={contextValue}>
			<Component {...props} />
		</LayoutContext.Provider>
	);
}

export default React.memo(LayoutContainer);
