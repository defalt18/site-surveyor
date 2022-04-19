import * as React from 'react';
import Close from './assets/icons/Close';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { isEmpty, map } from 'lodash';
import { ROUTES } from './routes';

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const isHidden = isEmpty(location.state);

	return (
		<div className='bg-light-primary sticky top-0 z-10'>
			<div className='bg-dark-primary flex items-center justify-between py-[1.2rem] px-[1.4rem] rounded-lg my-[0.5rem]'>
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
		</div>
	);
};

function App() {
	return (
		<div className='w-[43.1rem] p-[0.6rem] pt-0 bg-light-primary h-[60rem] flex flex-col overflow-auto'>
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
