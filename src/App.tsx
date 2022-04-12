import * as React from 'react';
import Home from './modules/home/views';
import Close from './assets/icons/Close';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import VisualImpairment from './modules/disability/modules/visual-impairment/views';
import { isEmpty } from 'lodash';

const Header = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const isHidden = isEmpty(location.state);

	return (
		<div className='bg-dark-primary flex items-center justify-between py-[1.2rem] px-[1.4rem] rounded-lg mb-[0.5rem] sticky top-2'>
			{/* @ts-ignore */}
			<button disabled={isHidden} onClick={() => !isHidden && navigate(location.state.details)}>
				<span className='w-[1.4rem] text-primary text-light-primary text-4xl'>
					{!isHidden ? '<' : ''}
				</span>
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
		<div className='w-[43.1rem] p-2'>
			<Router>
				<Header />
				<Routes>
					<Route path='/disability/visual-impairment' element={<VisualImpairment />} />
					<Route path='*' element={<Home />} />
				</Routes>
			</Router>
		</div>
	);
}

export default React.memo(App);
