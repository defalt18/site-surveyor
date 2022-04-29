import * as React from 'react';

const SvgComponent = (props: React.SVGProps<any>) => (
	<svg
		width={76}
		height={68}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		xmlnsXlink='http://www.w3.org/1999/xlink'
		{...props}
	>
		<path opacity={0.1} fill='url(#resize_a)' d='M0-3.988h76v76H0z' />
		<defs>
			<pattern id='resize_a' patternContentUnits='objectBoundingBox' width={1} height={1}>
				<use xlinkHref='#resize_b' transform='scale(.01042)' />
			</pattern>
			<image
				id='resize_b'
				width={96}
				height={96}
				xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAACKklEQVR4nO3bvU7DMBiFYQMXzUjZuC0GromxDNRSFOXHdo59PqvvI3UC4XBeliYlJQAAAACYyy2l9OW+iGd1SyndHy8iDLYcnwiDbY1PhEGOxidCZyXjE6GTmvGJINYyPhFEroxPhIsU4xOhkXJ8IlTqMT4RCvUcnwgnRoxPhB0jxyfCimP8MBFe3BfQ4H7y9al+p1f3BTw7ApgRwIwAZgQwI4AZAcx6B7h1/vkj2N+stcrvcNXO3t32OG+6CMvbC2qOAFNFWN/bUXMFmCLC1o01NWeA0BH27mqquQOEjHB0S1ktQoBQEc7u56tFCRAiQsnDFLVo59kilD7JUot2niVCzWNEtWjnDY9Q+wxXLdp5QyM4H6DP8uoWgfGNERjfGIHxO0YoeR7wW/A92Cbb7j35/5pme300LX2ACMbxMyIYx89qI6hFO2/o+FlNBLVo5w0fPyuNoBbtPMv4WUkEtWjn2cbPziKoRQpgHz87iqAWJUCY8bO9CGoRAoQbP9uKoOYOEHb8bB1BzRkg/PjZMoKaK8A042c5gpojwHTjZz0+nj46QNeP2E/1P7UPZyNP9TvxHzJmBDAjgBkBzAhgRgAzAphFCKB+xlzzs6Z9h6vm+LQF46+MjMD4O0ZEYPwTPSMwfqEeERi/kjIC4zdSRGD8i65EYHyRlgiML1YTgfE7KYnA+J0dRWD8QbYiMP5gywjTjv/mvoALftL/R1C+U0qf5msBAAAAgGJ/yr7gpVevGjsAAAAASUVORK5CYII='
			/>
		</defs>
	</svg>
);

export default SvgComponent;
