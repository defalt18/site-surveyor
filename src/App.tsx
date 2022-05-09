import * as React from 'react';
import Close from './assets/icons/Close';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { map } from 'lodash';
import { ROUTES } from './routes';
import { HeaderContext } from './context/HeaderContext';

const { Provider } = HeaderContext;

const Header = ({ LeftNode }: { LeftNode: React.ReactNode }) => {
	return (
		<div className='bg-light-primary sticky top-0 z-10'>
			<div className='bg-dark-primary flex items-center justify-between py-[1.2rem] px-[1.4rem] rounded-lg my-[0.5rem]'>
				{/*<button*/}
				{/*	disabled={isHidden}*/}
				{/*	onClick={onBack ?? DEFAULT_VALUE}*/}
				{/*	className='w-[1.4rem] flex-shrink-0'*/}
				{/*>*/}
				{/*	<span className='text-primary text-light-primary text-4xl'>{!isHidden ? '<' : ''}</span>*/}
				{/*</button>*/}
				<div className='w-[1.4rem] flex-shrink-0'>{LeftNode}</div>
				<p className='text-primary text-light-primary'>Check For Inclusivity</p>
				<button onClick={window.close}>
					<Close />
				</button>
			</div>
		</div>
	);
};

function Layout({ children }: { children: React.ReactNode }) {
	const [LeftNode, setHeaderProps] = React.useState<React.ReactNode>();

	return (
		<Provider value={{ setHeaderProps }}>
			<Header LeftNode={LeftNode} />
			<Routes>{children}</Routes>
		</Provider>
	);
}

function AppContainer() {
	return (
		<div className='container p-[0.6rem] pt-0 flex flex-col overflow-auto'>
			<Router>
				<Layout>
					{map(ROUTES, (route, index) => (
						<Route {...route} key={index} />
					))}
				</Layout>
			</Router>
		</div>
	);
}

export default React.memo(AppContainer);
