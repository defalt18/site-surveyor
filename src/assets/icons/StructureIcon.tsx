import React from 'react';

function StructureIcon(props: React.SVGProps<any>) {
	return (
		<svg
			width={69}
			height={67}
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
			xmlnsXlink='http://www.w3.org/1999/xlink'
			{...props}
		>
			<path opacity={0.1} fill='url(#structure_a)' d='M0 0h69v67H0z' />
			<defs>
				<pattern id='structure_a' patternContentUnits='objectBoundingBox' width={1} height={1}>
					<use xlinkHref='#structure_b' transform='matrix(.01238 0 0 .01275 -.116 -.104)' />
				</pattern>
				<image
					id='structure_b'
					width={96}
					height={96}
					xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAABvElEQVR4nO3cTU4CQRgG4Vfj1ngBWRrubohewCthwngAXKgbooJD91R/Uk/SS4fuqfDjDHQiSZIkSZIksVZJNkmmJPszx5TkKcl60RUUtkqyzfkn/nBsk9wvuI6yNml/8r/G44LrKKvFy85PY7fgOk5yRU/gG/vOxx9qzdf0BC6dAWAGgBkAZgCYAWAGgBkAZgCYAWAGgBkAZgCYAWAGgI0Y4K3jsYe7ITNigJeix/431ul3U/5hwXWUdp+PG+i7tLkPvMmgJ3+o+6MnOnbPuNSaRnwPuCgGgBkAZgCYAWAGgBkA1itAy+/3H45jWj/elOQ5hX5f0Ov7/fR4/Vzb8Hp+v58ezX9f0OPf9inJbYfjjmBKctfygD0CnPI6XVnTc+anIJgBYAaA3QCPOfr1+kXfw3wGwAwAMwDMADADwAwAMwBsboDfrvcf89319qX38yk9/+r7+VSff/n9fKrPv/x+PkPNf851mf2Mv/mL3teKhpq/n4JgBoAZAGYAmAFgBoAZAGYAmAFgBoAZAGYAmAFgBoAZADYnQPX9fIaa/5wA1ffzqT7/8vv5VJ9/kvr7+VSfvyRJkiRJkgp6BxP7IP0WTdRRAAAAAElFTkSuQmCC'
				/>
			</defs>
		</svg>
	);
}

export default StructureIcon;
