import * as React from 'react';
import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<any>) => (
	<svg width={67} height={45} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
		<path
			d='M51.625 17.063V4.374A3.636 3.636 0 0 0 48 .75H4.5A3.636 3.636 0 0 0 .875 4.375v36.25A3.636 3.636 0 0 0 4.5 44.25H48a3.636 3.636 0 0 0 3.625-3.625V27.937l14.5 14.5V2.563l-14.5 14.5Z'
			fill='#E5E5E5'
		/>
	</svg>
);

export default SvgComponent;
