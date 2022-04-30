import * as React from 'react';

const SvgComponent = (props: React.SVGProps<any>) => (
	<svg width={46} height={33} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
		<path
			d='m.083 9.75 4.167 4.167c10.354-10.354 27.146-10.354 37.5 0l4.167-4.167C33.27-2.896 12.75-2.896.083 9.75ZM16.75 26.417l6.25 6.25 6.25-6.25c-3.438-3.459-9.042-3.459-12.5 0Zm-8.333-8.334 4.166 4.167c5.75-5.75 15.084-5.75 20.834 0l4.166-4.167c-8.041-8.041-21.104-8.041-29.166 0Z'
			fill='#fff'
		/>
	</svg>
);

export default SvgComponent;
