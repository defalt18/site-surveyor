import * as React from 'react';
import { render } from 'react-dom';
import './index.css';

function ExtensionContainer() {
	return (
		<div className='h-128 w-128 bg-yellow-200'>
			<h1>Hey there</h1>
		</div>
	);
}

render(<ExtensionContainer />, document.getElementById('root'));
