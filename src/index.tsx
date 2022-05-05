import * as React from 'react';
import './index.css';
import { createRoot } from 'react-dom/client';
import 'regenerator-runtime/runtime';
import Loader from './molecules/loader';

const App = React.lazy(() => import('./App'));

function ExtensionContainer() {
	return (
		<React.Suspense fallback={<Loader className='bg-light-primary w-[43.1rem] h-[60rem]' />}>
			<App />
		</React.Suspense>
	);
}

const rootContainer = document.getElementById('root');

// New API root strategy
createRoot(rootContainer).render(<ExtensionContainer />);
