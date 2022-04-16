import * as React from 'react';

const SvgComponent = (props: React.SVGProps<any>) => (
	<svg width={70} height={58} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
		<path
			opacity={0.1}
			d='M63.498.512h-57C3.015.512.165 3.362.165 6.845v44.333c0 3.484 2.85 6.334 6.333 6.334h57c3.483 0 6.333-2.85 6.333-6.334V6.845c0-3.483-2.85-6.333-6.333-6.333Zm0 50.698h-57V6.813h57V51.21ZM22.33 41.678h7.917l4.75 4.75 4.75-4.75h7.916v-7.916l4.75-4.75-4.75-4.75v-7.917h-7.916l-4.75-4.75-4.75 4.75H22.33v7.917l-4.75 4.75 4.75 4.75v7.916Zm12.667-22.166c5.257 0 9.5 4.243 9.5 9.5 0 5.256-4.243 9.5-9.5 9.5v-19Z'
			fill='#000'
		/>
	</svg>
);

export default SvgComponent;
