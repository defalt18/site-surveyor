import * as React from 'react';

const SvgComponent = (props: React.SVGProps<any>) => (
	<svg width={55} height={55} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
		<path
			opacity={0.1}
			d='M52.028 37.152c-3.69 0-7.26-.6-10.59-1.68a2.932 2.932 0 0 0-3.03.72l-4.71 5.91c-8.49-4.05-16.44-11.7-20.67-20.49l5.85-4.98c.81-.84 1.05-2.01.72-3.06-1.11-3.33-1.68-6.9-1.68-10.59 0-1.62-1.35-2.97-2.97-2.97H4.568c-1.62 0-3.57.72-3.57 2.97 0 27.87 23.19 51.03 51.03 51.03 2.13 0 2.97-1.89 2.97-3.54v-10.35c0-1.62-1.35-2.97-2.97-2.97Z'
			fill='#000'
		/>
	</svg>
);

export default SvgComponent;
