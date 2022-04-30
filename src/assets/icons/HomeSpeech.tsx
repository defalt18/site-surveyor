import * as React from 'react';

const SvgComponent = (props: React.SVGProps<any>) => (
	<svg width={42} height={42} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
		<path
			d='M37.667.167H4.333C2.042.167.188 2.042.188 4.333l-.021 37.5L8.5 33.5h29.167a4.179 4.179 0 0 0 4.166-4.167v-25A4.179 4.179 0 0 0 37.667.167ZM14.75 18.917h-4.167V14.75h4.167v4.166Zm8.333 0h-4.166V14.75h4.166v4.166Zm8.334 0H27.25V14.75h4.167v4.166Z'
			fill='#fff'
		/>
	</svg>
);

export default SvgComponent;
