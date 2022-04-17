import * as React from 'react';
import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<any>) => (
	<svg
		width={73}
		height={73}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		xmlnsXlink='http://www.w3.org/1999/xlink'
		{...props}
	>
		<path opacity={0.1} fill='url(#a)' d='M.998.012h72v72h-72z' />
		<defs>
			<pattern id='a' patternContentUnits='objectBoundingBox' width={1} height={1}>
				<use xlinkHref='#b' transform='scale(.01042)' />
			</pattern>
			<image
				id='b'
				width={96}
				height={96}
				xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAACaklEQVR4nO3cW1ITQRiG4VcN4UbXYShgVR42EwNqia4EBU+bABegSzC5Eii8mKQorYJkerrnnxnep6qvyAzd/YUm6en6QZIkSZLq2wfeAOfAArhe0xbL174G9gL6OxjbwHvgivWTflu7Ao6Acct9771t4DvpE/9/+4Yh1PKBfJO/au9aHUGP7dNs2bmtXQK7LY6jEx4mXPM88bp1HgHPCtx3cH6Q/92/amctjqO35pQL4HeL4+iEBwnXXGfvxb/W9an072+q1pyWWMtVgwEEM4BgBhDMAIIZQDADCDZKuGYBPM7dkaVNvoilfHfprJS/gF/Ze9HOvTspJYAv2Xtx43PBew/GHtXWsdvRgY7IH8DbVkfQc2Oqx4i5Jv8rPpKsbUz1GLHJcnRJ9c538hvYBQ6oHqZs8qxgvnztAa75kiQ1skP1D7XO2dAzYAZMAvo7GFvAIXBB+sfQC6ogUjYF77Ut4BP5voh9xBBqOST/VsSs1RH02A7Nlp27lqOnLY6jE1K2o19SZrkYAS8K3Hdwzsn/7l81z4ZuwLOhGZU4G9r0bKdnQ9UeAwhmAMEMIJgBBDOAYAYQLGVLYQ48uePnTT6nezZ0AyXPb/4seO9OSgngNHsvbpwUvPdgTCizHf2He7gdnWpG/gCmrY6g50bAMfkm/xgfSdY2ovpLaPpQfoqT38gEeEX9s6FTXPMlSWrEuqFBrBsayLqhwawbGsi6oRlZN7SHrBsazLOhGVk3ND/PhvaJAQQzgGAGEMwAghlAMAMIZt3QYF07G2rd0A1YNzSYdUM7wLqhwawb2gHWDe0I64ZKkiRJUg1/AYuC1R/wZ5P6AAAAAElFTkSuQmCC'
			/>
		</defs>
	</svg>
);

export default SvgComponent;
