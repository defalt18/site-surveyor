import * as React from 'react';

const SvgComponent = (props: React.SVGProps<any>) => (
	<svg width={29} height={28} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
		<path
			d='M14.477 0c-7.728 0-14 6.272-14 14s6.272 14 14 14 14-6.272 14-14-6.272-14-14-14Zm0 16.8-5.6-5.6h11.2l-5.6 5.6Z'
			fill='#FFF8F2'
		/>
	</svg>
);

export default SvgComponent;
