import * as React from 'react';

function App() {
	return (
		<div style={{ width: 200, height: 500 }} className='overflow-scroll p-2'>
			<p className='text-xl font-bold'>Extension body</p>
		</div>
	);
}

export default React.memo(App);
