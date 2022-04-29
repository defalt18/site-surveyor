import * as React from 'react';
import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<any>) => (
	<svg
		width={73}
		height={72}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		xmlnsXlink='http://www.w3.org/1999/xlink'
		{...props}
	>
		<path opacity={0.1} fill='url(#pronoun_a)' d='M.998 0h72v72h-72z' />
		<defs>
			<pattern id='pronoun_a' patternContentUnits='objectBoundingBox' width={1} height={1}>
				<use xlinkHref='#pronoun_b' transform='scale(.01042)' />
			</pattern>
			<image
				id='pronoun_b'
				width={96}
				height={96}
				xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGAAAABgCAYAAADimHc4AAAABmJLR0QA/wD/AP+gvaeTAAAE60lEQVR4nO2bS4sdRRiGnwyKxgxiTDRiLgyujNkICaIGF16JN/AvOGdiAoqMUSPqwiFuvCu6UuNaBHdu42Y0oi6SKLqIIiIu1IkyXmLGEHRcVDdpjz1dX926q8/5HqjNqa6vqt63T1GXLlAURVEURVEURbFzMXAI2OFRdgqYjducYJYTp6hcBHxaBP4VuNah7Bbgm6LsM7EbFkBvDKiKX6bfgOsEZavilykXE3phQJ34ZToJ3NhQtk78nEzI3oAm8cv0J3BTTdkm8XMxIXsDDgkrOsl/TZgCvhWWnYvRUE+yN+Bq4BdhZaeAW5G9+dX0VIyGepK9AQDXYGY9kgqXgO8dGtjl2w9+orZuAJjZzu+RG9flm+/CbZgXq1MDAK4nngnjIH50AwB2An8ENGicxE9iAMANmFmPit+RAWBmO64NHDfxkxowhdts5wywK2WDIrELufiS55LgOs8v02ng7lSNioDLm38auEvwXHR8xc/dBB/xETwbFZftBdtf13U4Oh+4A3gNOAwsAH8V6SfgwyLvduA8x9iuw0617a0ZEEt8VxPWAk9jBJfGXgAOFGVthIiPoEwUXMU/E9ChKgPgZ4d6h9MJ4N6G+KHiIygXjKv4cxE6dgHwjkOdtvQ2sHqojhjiIygbzKywkaX4oR1cC3zkUKc0HcacbYS0rY7kBoAR1kX8EteO3gN8IHzeJ80XdcQSH0GMaDzWUEnTCjfmqrLNVJ1qNtGaAVBvgmR7oW8mSMVHECs61eHI5TDFZThqSkeAB4CtwJoibS1+Oxohvs8apXXm8DvJCjFhCZgGVjXEn8BMXUPqyF78UHxMOIU5h5Cy06OOsRC/xNWEaY86Zhzij5X4JVITjmCGFlcmgGOC+GMpfolkdnR/QPwHLbFdZjsji23mcmVA7KsssY8GxB4ZFmkWaTIg9qQl9mJA7Cj4jK2xOTdhbFv/zklYt4gcDDhhyd8cEHuTJX8hIHYUcjDgR0v+zQGxbwmsOzk5GPCxJX+A/zTUtn74xCPuyCH5smDgEXe3IO6dgW0fCdZgnwktEX8rYrGoWwGeRbZinaF5OJrAvPmSFXbXN3OyYiNmw02yb3MMs8Ldxtnt6G3Fb5Kth2XMlarLW+lZj9iHTLwYKbe7ylkwgTmzTS3+PHnM/rJkPfAl6cT/CtjQWm96yiaMUCnE39hiP3rNhcC7xBP/PWSfKSoVVgF7MdsFvsL/AOyh+RxZsTAJPAEcRy78ceBxwraylRq2Yxd/e2et86CPf81lS36v+qTz4Y5RAzpGDeiYPoyXtjHfRtZ91H9Ax6gBHaMGdEzW4+MK6DpAiUeuBsxirsfGYh3wJD37d3RFeQXqO+CKmnzbXtAwlwCfFXkHURMaGb4OW2eCiwGXAp8P5b+KmlDLSneRh02QGrAB+GKFZ15O2I9eYrsIXjVBYsBl2M+WX0zcp94guYVfNcH23Gbga2HMAy30r5HOv49HvtezBXhf8Nw88hnUP8LnRp79+J/7+qbnWulZj3iU9sR/vqU+9Y5HSC/+C631pqc8TDrxdeYjJMWHui+12oMR4CHiia8LL09mMVNFFb9D9uJvwivovk8U9uBuwuuo+FG5D7kJb6DiJ2E38DfN4r+Jip+UGVY24SD5nvKNFAP+b8JbqPitMs1ZE1T8jhhgxnwVX1EURVEURVGU3vAvEoEI7dSTdgIAAAAASUVORK5CYII='
			/>
		</defs>
	</svg>
);

export default SvgComponent;
