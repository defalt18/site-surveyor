import * as React from 'react';

const SvgComponent = (props: React.SVGProps<any>) => (
	<svg width={70} height={57} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
		<path
			opacity={0.1}
			d='M70.998 49.79V6.233c0-3.422-3.5-6.222-7.778-6.222H8.776C4.498.012.998 2.812.998 6.234V49.79c0 3.422 3.5 6.222 7.778 6.222H63.22c4.278 0 7.778-2.8 7.778-6.223ZM22.387 32.677l9.722 9.365L45.72 28.012l17.5 18.666H8.776l13.61-14Z'
			fill='#000'
		/>
	</svg>
);

export default SvgComponent;
