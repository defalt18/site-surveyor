import * as React from 'react';
import { SVGProps } from 'react';

const SvgComponent = (props: SVGProps<any>) => (
	<svg
		width={69}
		height={70}
		fill='none'
		xmlns='http://www.w3.org/2000/svg'
		xmlnsXlink='http://www.w3.org/1999/xlink'
		{...props}
	>
		<path opacity={0.1} fill='url(#audio_a)' d='M0 0h72v72H0z' />
		<defs>
			<pattern id='audio_a' patternContentUnits='objectBoundingBox' width={1} height={1}>
				<use xlinkHref='#audio_b' transform='scale(.02083)' />
			</pattern>
			<image
				id='audio_b'
				width={48}
				height={48}
				xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABmJLR0QA/wD/AP+gvaeTAAACjUlEQVRoge2Zu2sUURjFfz4IvkjjAxHRTpQ0oiiCIqyCRbTwBVbW+h+ISmA7H1j4N4iKCBpit4VsggpKwhaigoqCopAigmhhInHXYhyZnPl25u5k7swWc2CK795zvz0nc+c+vkCFChUqlIllnvPXgXFpawC7gDXANDDrWUNm1IGO0d6JPHPAGHC4QF1OCMWnGYg+E8D2ogQmISq+FwMdguk0AiwvRKkBFW8ZOA7cAF4a3PAZA1YWoHcBLPGWgSgOAKNdxo0Dg77EKrqJTzMQ4ijwyRjbAJbmLVaRJN7VAMBa4JkxfiRPsYo08ZaBu8Bp7A91NfBExs8TTLXc4SI+aRV6RzB1FBuIT6enOWt3Fp+2jLaBa8AS4Rw08hwpQ7zrPnDd4N0XzoSrwF7EZTFwD/hj8I4Jb0j628DWfjAAsBeYEd5H4h/2lHDO94sBCE6kv4V7RjgXpf+2JvG+SSSgBdySNp1GLYl3uCQu6g0A7BHue+nfJP0z/WZglXB/Sv+A9M9pgjKnEMTXf8VAWoKyDQxJPC3xRol/aIKyDZyT+LnEmyX+rAnKNLAbOCttjySuSfzGJXERH/E+4JvwPhDfyF4IR99YKQaso0Sb+Ml057/2KGeLi4E0+DjMXTV4D4TjfJjL20SSgTZwxeAcYuFfvwOczNMALP5C8xYYNvrXA18lRwtPC06WK+Ud4BR2WXOQ4PYVHT8P7M9beBR5XerXAZPG+Mt5iu2GC8YP92JgGPhijH2M/wL0f2QpbNUINi9rXJMCC1shXEqLJ4CbwGuDGz6jwIoC9JpYTHH3F3CJEou7IbKU15vAtqIEusDlHxyzwEPihzZn+HxV9S7tDeAVQR20CXz3qKFChQoVPOMvKK8KRV582+YAAAAASUVORK5CYII='
			/>
		</defs>
	</svg>
);

export default SvgComponent;
