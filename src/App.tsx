import * as React from 'react';
import Close from './assets/icons/Close';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { isEmpty, map } from 'lodash';
import { ROUTES } from './routes';
import { HeaderContext } from './context/HeaderContext';

const { Provider } = HeaderContext;

const Header = ({ onBack }: { onBack: () => void }) => {
	const location = useLocation();
	const isHidden = isEmpty(location.state);

	return (
		<div className='bg-light-primary sticky top-0 z-10'>
			<div className='bg-dark-primary flex items-center justify-between py-[1.2rem] px-[1.4rem] rounded-lg my-[0.5rem]'>
				<button disabled={isHidden} onClick={onBack} className='w-[1.4rem] flex-shrink-0'>
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

function Layout({ children }: { children: React.ReactNode }) {
	const [onBack, setBackFn] = React.useState<() => void>();

	return (
		<Provider value={{ setBackFn }}>
			<Header onBack={onBack} />
			{children}
		</Provider>
	);
}

function AppContainer() {
	return (
		<div className='w-[43.1rem] p-[0.6rem] pt-0 bg-light-primary h-[60rem] flex flex-col overflow-auto'>
			<Router>
				<Layout>
					<Routes>
						{map(ROUTES, ({ element, ...routeItem }, index) => {
							const Component = element || undefined;
							return <Route {...routeItem} element={<Component />} key={index} />;
						})}
					</Routes>
				</Layout>
			</Router>
		</div>
	);
}

export default React.memo(AppContainer);
