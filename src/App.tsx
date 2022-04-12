import * as React from 'react';
// import { CSSTransition } from 'react-transition-group';

export default function App() {
	return (
		// <CSSTransition unmountOnExit classNames='fade' timeout={300}>
		<div style={{ width: 200, height: 500 }} className='overflow-scroll p-2'>
			<p className='text-xl font-bold'>Extension body</p>
		</div>
		// </CSSTransition>
	);
}
