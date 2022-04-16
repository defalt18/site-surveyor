import * as React from 'react';

const SvgComponent = (props: React.SVGProps<any>) => (
	<svg width={74} height={46} fill='none' xmlns='http://www.w3.org/2000/svg' {...props}>
		<path
			opacity={0.1}
			d='M2.238 45.012c-.341 0-.661-.128-.96-.384a1.303 1.303 0 0 1-.384-.96c0-.17.043-.363.128-.576l15.424-41.28c.128-.427.363-.79.704-1.088.384-.342.896-.512 1.536-.512h6.976c.64 0 1.13.17 1.472.512.341.298.597.661.768 1.088l15.424 41.28c.043.213.064.405.064.576 0 .384-.128.704-.384.96a1.228 1.228 0 0 1-.896.384h-5.568c-.597 0-1.045-.128-1.344-.384-.256-.299-.427-.576-.512-.832l-3.008-7.808H12.67l-3.008 7.808c-.085.256-.277.533-.576.832-.256.256-.683.384-1.28.384H2.238ZM14.91 28.628h14.528L22.142 8.852 14.91 28.628Zm40.151 17.024c-2.219 0-4.224-.427-6.016-1.28-1.792-.896-3.221-2.07-4.288-3.52-1.024-1.494-1.536-3.158-1.536-4.992 0-2.987 1.195-5.355 3.584-7.104 2.432-1.792 5.632-2.987 9.6-3.584l8.768-1.28v-1.344c0-1.792-.448-3.179-1.344-4.16-.896-.982-2.432-1.472-4.608-1.472-1.536 0-2.795.32-3.776.96a5.574 5.574 0 0 0-2.112 2.432c-.341.554-.832.832-1.472.832h-5.056c-.47 0-.832-.128-1.088-.384-.213-.256-.32-.598-.32-1.024.043-.683.32-1.515.832-2.496.512-.982 1.323-1.92 2.432-2.816 1.11-.939 2.539-1.728 4.288-2.368 1.75-.64 3.861-.96 6.336-.96 2.688 0 4.95.341 6.784 1.024 1.877.64 3.37 1.514 4.48 2.624 1.11 1.11 1.92 2.41 2.432 3.904.512 1.493.768 3.072.768 4.736v20.096c0 .426-.15.79-.448 1.088a1.481 1.481 0 0 1-1.088.448h-5.184c-.47 0-.853-.15-1.152-.448a1.615 1.615 0 0 1-.384-1.088V40.98c-.555.81-1.301 1.578-2.24 2.304-.939.682-2.09 1.258-3.456 1.728-1.323.426-2.901.64-4.736.64Zm2.176-6.08c1.493 0 2.837-.32 4.032-.96 1.237-.64 2.197-1.622 2.88-2.944.725-1.366 1.088-3.072 1.088-5.12v-1.344l-6.4 1.024c-2.517.384-4.395 1.002-5.632 1.856-1.237.853-1.856 1.898-1.856 3.136 0 .938.277 1.75.832 2.432.597.64 1.344 1.13 2.24 1.472a8.845 8.845 0 0 0 2.816.448Z'
			fill='#262626'
		/>
	</svg>
);

export default SvgComponent;
