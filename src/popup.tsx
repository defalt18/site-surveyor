import * as React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';

function ExtensionContainer() {
	return <App />;
}

render(<ExtensionContainer />, document.getElementById('root'));
