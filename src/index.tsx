import * as React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';
import 'regenerator-runtime/runtime';

function ExtensionContainer() {
	return <App />;
}

const rootContainer = document.getElementById('root');

// New API root strategy
createRoot(rootContainer).render(<ExtensionContainer />);
