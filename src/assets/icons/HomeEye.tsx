import * as React from 'react';

const SvgComponent = (props: React.SVGProps<any>) => (
	<svg width={46} height={32} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
		<path
			d='M23 .375C12.583.375 3.687 6.855.083 16 3.687 25.146 12.583 31.625 23 31.625c10.417 0 19.312-6.48 22.917-15.625C42.312 6.854 33.417.375 23 .375Zm0 26.042c-5.75 0-10.417-4.667-10.417-10.417S17.25 5.583 23 5.583 33.417 10.25 33.417 16 28.75 26.417 23 26.417ZM23 9.75A6.242 6.242 0 0 0 16.75 16 6.242 6.242 0 0 0 23 22.25 6.242 6.242 0 0 0 29.25 16 6.242 6.242 0 0 0 23 9.75Z'
			fill='#fff'
		/>
	</svg>
);

export default SvgComponent;
