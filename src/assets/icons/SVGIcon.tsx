import * as React from 'react';

const SvgComponent = (props: React.SVGProps<any>) => (
	<svg
		width={77}
		height={68}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		xmlnsXlink='http://www.w3.org/1999/xlink'
		{...props}
	>
		<path opacity={0.1} fill='url(#svg_a)' d='M-8-6h85v85H-8z' />
		<defs>
			<pattern id='svg_a' patternContentUnits='objectBoundingBox' width={1} height={1}>
				<use xlinkHref='#svg_b' transform='scale(.01042)' />
			</pattern>
			<image
				id='svg_b'
				width={96}
				height={96}
				xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAE00lEQVR4nO2cXYiVRRjHf66V7lpumfZBH6SmobtpUVBgF30YJLGZSaQXCSWUFZsoqBcJell7E3VV9CEVlAQF2UVFXYRplAXp1l4oqGkfEqKkma7i7nYx56AtZ8+ZeZ+ZM+/MPj+Ym8N555n5/888M+975h1QFEVRFEVRlKYzJnYDIjMR6ALmAJcCp4EdwBfA4Yjtyp5WoAc4AQzVKCeBV4GLYzUwZyYDvdQWfnj5BZgap5l50gr8gJ341XIAmBajsTnyBm7iV8tBYHqE9mbFYxQTX03wwAzgGDID1ISCjAd+Qi6+mlCQN7ETdhNwxvK7OjFbsgQ7QTdXvv8I9iboSGjADOA4jYXcg7kjrqImeMA2758CbqlxvZog5C3sxFtepw41oSC2ef8Di7oeBPot61MTgJnY5f3dwCWWdaoJlowHdmKX9+c61q0mWGCb958oWL/LnLAXmFQwTnCuAwax64jv8o6w7YuwN2GLMFYwuokjvkver4dLOprnIZ53vqL54p8AOjz2wXYkvOYxphcmYT+EfZYNAfpiY0JvgLgiHidO+vkbuCNAfxr9x3AoQEwRHxHHgBAmTAG+aRDzD4/xxLQy8i6EZppwp4e+dAL7LOJ96SGWNxYSV3xfJjxQqcMm1mpBHO+8TXzxpeloDTBgGeM4ZgtMKRiL2WkWW/iiI+Ei3H9AT9nLE567iS94URMuB752rPclZ4UC8zLxxa5nwkjp6GZgv0NdZylZ3q9is2KIbcLwkbAA+8l2CPgHs9AoHbcSX2BXE1ZiP9kOAb9V+llKNhJfXBcTPna8Zivmpqy07CK+sKHK+5g/gkrLDcQXKUQZxIzs0rOa+GL5LqWdbGuxlfiC+SylnmyHMxmzLo4tmq+yHbjSq0KBeRI/He/FLAs7gAmV0lH57GdPMRqVTcA4v/KEZwuyTvcDzwAtdWK0AM9i3m4MJf4amQxxmIB501Ai/j0O8e4lnAlJshhZp1cUiPmcMGZWBrxH8Q73Uj/tjMRYzGulo96AC4GjFO/w84LYqwRxszFgPrIOzxbE7hTGbroBRYZ6IxYJrz8ouPaAMHbT8W3AGOAhYR2DwvhJ4duA24FrhXXcKLj2emHspuPbgIeF13+PLI3cL4yfPH0Un+y+A9oFsUf9MnQm8cSHcNvek2Et8cS/D30UwbfESTvdhH0YlwRX47aLwFX8iZhz3dowx4h1Yu56Q+T8JA1YgVunfgQus6y7HWNWaKGTNuBz8hQ/CQPasc/BqYmfhAFLyVf8JAzYTL7il96AcTQ+iy1l8UtvwALqN95lqVlG8SVPZpvC6+T3yz8LbAPWIXsyG5wW4E/yEP8k8CnmtaIrnJWIxDzSFv8I8C7wKIke0t1DeuL/ikmbXZjNA0mzmzTE7wNeBO4iwb8sR2L47oMyiT/AuUn0JlEvS8x6yiX+KcyxACsxT2azp3oGf0zxjwIfAsv4/8Gr2XMN5gYlhvh/YVYuXZi310cl3TRX/L3AK2Q2iUroIaz4AxiDNwKzfDY8F9osv+cifj/wGfA0cJXn9o5KbMT/F3P7vwz5rgjlPOqJf5hzk2hy71ylQC3x92Em0fnABfGalj/ni9+HmURvi9qiBPC1rGsDXsA8nv4E+N1TvYqiKIqiKIqiKIqiKIqSDf8BgEhOb7n1sB4AAAAASUVORK5CYII='
			/>
		</defs>
	</svg>
);

export default SvgComponent;
