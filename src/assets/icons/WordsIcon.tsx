import * as React from 'react';

const SvgComponent = (props: React.SVGProps<any>) => (
	<svg width={64} height={24} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
		<path d='M0 0h64v8H0V0Zm0 16h40v8H0v-8Z' fill='#E9E9E9' />
	</svg>
);

export default SvgComponent;
