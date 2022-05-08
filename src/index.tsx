import * as React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import 'regenerator-runtime/runtime';
import Loader from './molecules/loader';

const App = React.lazy(() => import('./App'));

function ExtensionContainer() {
	return (
		<React.Suspense fallback={<Loader className='container grid place-items-center' />}>
			<App />
		</React.Suspense>
	);
}

const rootContainer = createRoot(document.getElementById('root'));

// New API root strategy
rootContainer.render(<ExtensionContainer />);
