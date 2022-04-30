import React from 'react';
import Lottie from 'lottie-react';
import c from 'classnames';
import * as animationData from '../../assets/lotties/loader.json';

const defaultOptions = {
	loop: true,
	autoplay: true,
	animationData: animationData,
	rendererSettings: {
		preserveAspectRatio: 'xMidYMid slice',
	},
};

const Loader = ({ className }: { className?: string }) => {
	return (
		<div className={c(className)}>
			<Lottie height={200} width={200} {...defaultOptions} />
		</div>
	);
};

export default Loader;
