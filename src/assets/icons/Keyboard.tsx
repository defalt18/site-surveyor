import * as React from 'react';

const SvgComponent = (props: React.SVGProps<any>) => (
	<svg width={81} height={57} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
		<path
			opacity={0.1}
			d='M72.998.012h-64c-4.4 0-7.96 3.6-7.96 8l-.04 40c0 4.4 3.6 8 8 8h64c4.4 0 8-3.6 8-8v-40c0-4.4-3.6-8-8-8Zm-36 12h8v8h-8v-8Zm0 12h8v8h-8v-8Zm-12-12h8v8h-8v-8Zm0 12h8v8h-8v-8Zm-4 8h-8v-8h8v8Zm0-12h-8v-8h8v8Zm36 28h-32v-8h32v8Zm0-16h-8v-8h8v8Zm0-12h-8v-8h8v8Zm12 12h-8v-8h8v8Zm0-12h-8v-8h8v8Z'
			fill='#000'
		/>
	</svg>
);

export default SvgComponent;
