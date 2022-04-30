import * as React from 'react';

const SvgComponent = (props: React.SVGProps<any>) => (
	<svg width={34} height={34} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
		<path
			d='M17 4.292a4.374 4.374 0 1 1 0 8.75 4.374 4.374 0 1 1 0-8.75Zm0 18.75c6.187 0 12.708 3.041 12.708 4.375v2.291H4.292v-2.291c0-1.334 6.52-4.375 12.708-4.375ZM17 .333a8.331 8.331 0 0 0-8.333 8.334A8.331 8.331 0 0 0 17 17a8.331 8.331 0 0 0 8.333-8.333A8.331 8.331 0 0 0 17 .333Zm0 18.75c-5.563 0-16.667 2.792-16.667 8.334v6.25h33.334v-6.25c0-5.542-11.105-8.334-16.667-8.334Z'
			fill='#fff'
		/>
	</svg>
);

export default SvgComponent;
