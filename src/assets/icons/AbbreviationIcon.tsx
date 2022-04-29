import * as React from 'react';

const SvgComponent = (props: React.SVGProps<any>) => (
	<svg width={68} height={54} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
		<path
			d='M0 .314v10.737h17.895V54h10.737V11.05h17.894V.314H0ZM68 18.21H35.79v10.737h10.736v25.053h10.737V28.946H68V18.209Z'
			fill='#E9E9E9'
		/>
	</svg>
);

export default SvgComponent;
