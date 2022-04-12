import * as React from 'react';
import { render } from 'react-dom';

function ExtensionContainer() {
	return (
		<div>
			<h1>Hey there</h1>
		</div>
	);
}

render(<ExtensionContainer />, document.getElementById('root'));
