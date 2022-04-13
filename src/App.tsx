import * as React from 'react';
import Close from './assets/icons/Close';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { isEmpty, map } from 'lodash';
import { ROUTES } from '../routes';

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const isHidden = isEmpty(location.state);

	return (
		<div className='bg-dark-primary flex items-center justify-between py-[1.2rem] px-[1.4rem] rounded-lg mb-[0.5rem] sticky top-2'>
			<button
				disabled={isHidden}
				// @ts-ignore
				onClick={() => !isHidden && navigate(location.state.details)}
				className='w-[1.4rem] flex-shrink-0'
			>
				<span className='text-primary text-light-primary text-4xl'>{!isHidden ? '<' : ''}</span>
			</button>
			<p className='text-primary text-light-primary'>Check For Inclusivity</p>
			<button onClick={window.close}>
				<Close />
			</button>
		</div>
	);
};

function App() {
	return (
		<div className='w-[43.1rem] p-[0.6rem] bg-light-primary h-[63.1rem] flex flex-col'>
			<Router>
				<Header />
				<Routes>
					{map(ROUTES, ({ element, ...routeItem }, index) => {
						const Component = element || undefined;
						return <Route {...routeItem} element={<Component />} key={index} />;
					})}
				</Routes>
			</Router>
		</div>
	);
}

export default React.memo(App);
